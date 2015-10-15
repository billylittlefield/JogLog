window.PersonalCalendarGrid = React.createClass({
  getInitialState: function() {
    return {
      date: moment()
    };
  },
  retrieveWorkoutsForMonth: function() {
    ApiUtil.getMonthsWorkoutsByUser(this.state.date.month(),
                                    this.state.date.year(),
                                    window.CURRENT_USERID);
  },
  componentWillMount: function() {
    this.retrieveWorkoutsForMonth();
  },
  previousMonth: function() {
    this.setState({ date: this.state.date.add(-1, "month") });
    this.retrieveWorkoutsForMonth();
  },
  nextMonth: function() {
    this.setState({ date: this.state.date.add(1, "month") });
    this.retrieveWorkoutsForMonth();
  },
  renderWeeks: function() {
    var weeks = [];
    var displayMonth = this.state.date.clone().month();
    var nextMonth = this.state.date.clone().add(1, "M").month();
    var firstDayOfWeek = this.state.date.clone().startOf("month").day("Sunday");

    while (firstDayOfWeek.month() !== nextMonth) {
      weeks.push( <Week key={firstDayOfWeek.toString()}
                        weekStart={firstDayOfWeek.clone()}
                        displayMonth={displayMonth} /> );
      firstDayOfWeek.add(1, "week");
    }

    return weeks;
  },
  render: function() {
    return (
      <table className="table calendar-grid">
        <thead>
        <tr className="calendar-header">
          <th colSpan="2" onClick={this.previousMonth}>&#9664;</th>
          <th colSpan="4">
            {this.state.date.format("MMMM")+" "+this.state.date.format("YYYY")}
          </th>
          <th colSpan="2" onClick={this.nextMonth}>&#9654;</th>
        </tr>
        <DayHeaders />
        </thead>
        <tbody>
          {this.renderWeeks()}
        </tbody>
      </table>
    );
  }
});

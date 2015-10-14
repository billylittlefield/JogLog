window.PersonalCalendarGrid = React.createClass({
  getInitialState: function() {
    return {
      date: moment()
    };
  },
  componentWillMount: function() {
    ApiUtil.getMonthsWorkoutsByUser(this.state.date.month(),
                                    this.state.date.year(),
                                    window.CURRENT_USERID);
  },
  previousMonth: function() {
    this.setState({ date: this.state.date.add(-1, "month") });

  },
  nextMonth: function() {
    this.setState({ date: this.state.date.add(1, "month") });

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
      <div>
        <div className="calendar-header">
          <span onClick={this.previousMonth}>Prev</span>
          <span>
            {this.state.date.format("MMMM") + " " + this.state.date.format("YYYY")}
          </span>
          <span onClick={this.nextMonth}>Next</span>
        </div>
        <DayHeaders />
        {this.renderWeeks()};
      </div>
    );
  }
});

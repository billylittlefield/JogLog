window.PersonalCalendar = React.createClass({
  updateUserId: function() {
    return parseInt(_.isEmpty(this.props.params) ?
      window.CURRENT_USERID : this.props.params.userid);
  },
  getInitialState: function() {
    return {
      userId: this.updateUserId(),
      date: moment()
    };
  },
  retrieveWorkoutsForMonth: function(userId) {
    ApiUtil.getMonthsWorkoutsByUser(userId,
                                    this.state.date.month(),
                                    this.state.date.year());
  },
  componentWillMount: function() {
    this.retrieveWorkoutsForMonth(this.state.userId);
    CalendarStore.addUsernameChangeListener(this.updateUsername);
  },
  componentWillUnmount: function() {
    CalendarStore.removeUsernameChangeListener(this.updateUsername);
  },
  componentWillReceiveProps: function(nextProps) {
    var userId = nextProps.params.userid || window.CURRENT_USERID;
    this.setState({ userId: parseInt(userId) });
    this.retrieveWorkoutsForMonth(userId);
  },
  updateUsername: function() {
    this.setState({ username: CalendarStore.username() });
  },
  previousMonth: function() {
    this.setState({ date: this.state.date.subtract(1, "month") });
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
                        user={{id: this.state.userId}}
                        weekStart={firstDayOfWeek.clone()}
                        displayMonth={displayMonth}
                        type="personal" /> );
      firstDayOfWeek.add(1, "week");
    }
    return weeks;
  },
  render: function() {
    return (
      <div className="calendar-page-container">
        <table className="table calendar-grid">
          <thead>
          <tr className="no-selection calendar-header">
            <th colSpan="2">{this.state.username}</th>
            <th colSpan="1" onClick={this.previousMonth}>&#9664;</th>
            <th colSpan="2">
              {this.state.date.format("MMMM")+" "+this.state.date.format("YYYY")}
            </th>
            <th colSpan="1" onClick={this.nextMonth}>&#9654;</th>
            <th colSpan="2"></th>
          </tr>
          <DayHeaders type="personal"/>
          </thead>
          <tbody>
            {this.renderWeeks()}
          </tbody>
        </table>
      </div>
    );
  }
});

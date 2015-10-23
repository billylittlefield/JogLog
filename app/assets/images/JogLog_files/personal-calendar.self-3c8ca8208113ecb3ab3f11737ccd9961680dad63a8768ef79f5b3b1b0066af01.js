window.PersonalCalendar = React.createClass({
  displayName: "PersonalCalendar",

  updateUserId: function () {
    return parseInt(_.isEmpty(this.props.params) ? window.CURRENT_USERID : this.props.params.userid);
  },
  getInitialState: function () {
    return {
      userId: this.updateUserId(),
      date: moment()
    };
  },
  retrieveWorkoutsForMonth: function (userId) {
    ApiUtil.getMonthsWorkoutsByUser(userId, this.state.date.month(), this.state.date.year());
  },
  componentWillMount: function () {
    this.retrieveWorkoutsForMonth(this.state.userId);
    CalendarStore.addUsernameChangeListener(this.updateUsername);
  },
  componentWillUnmount: function () {
    CalendarStore.removeUsernameChangeListener(this.updateUsername);
  },
  componentWillReceiveProps: function (nextProps) {
    var userId = nextProps.params.userid || window.CURRENT_USERID;
    this.setState({ userId: parseInt(userId) });
    this.retrieveWorkoutsForMonth(userId);
    ApiUtil.getUserData();
  },
  updateUsername: function () {
    this.setState({ username: CalendarStore.username() });
  },
  previousMonth: function () {
    this.setState({ date: this.state.date.subtract(1, "month") });
    this.retrieveWorkoutsForMonth(this.updateUserId());
  },
  nextMonth: function () {
    this.setState({ date: this.state.date.add(1, "month") });
    this.retrieveWorkoutsForMonth(this.updateUserId());
  },
  renderWeeks: function () {
    var weeks = [];
    var displayMonth = this.state.date.clone().month();
    var nextMonth = this.state.date.clone().add(1, "M").month();
    var firstDayOfWeek = this.state.date.clone().startOf("month").day("Sunday");

    while (firstDayOfWeek.month() !== nextMonth) {
      weeks.push(React.createElement(Week, { key: firstDayOfWeek.toString(),
        user: { id: this.state.userId },
        weekStart: firstDayOfWeek.clone(),
        displayMonth: displayMonth,
        type: "personal" }));
      firstDayOfWeek.add(1, "week");
    }
    return weeks;
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "calendar-page-container" },
      React.createElement(
        "table",
        { className: "table calendar-grid" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { className: "no-selection calendar-header" },
            React.createElement(
              "th",
              { colSpan: "2" },
              this.state.username
            ),
            React.createElement(
              "th",
              { colSpan: "1", onClick: this.previousMonth },
              "◀"
            ),
            React.createElement(
              "th",
              { colSpan: "2" },
              this.state.date.format("MMMM") + " " + this.state.date.format("YYYY")
            ),
            React.createElement(
              "th",
              { colSpan: "1", onClick: this.nextMonth },
              "▶"
            ),
            React.createElement(
              "th",
              { className: "follow-button", colSpan: "2" },
              React.createElement(FollowButton, { followeeId: this.state.userId })
            )
          ),
          React.createElement(DayHeaders, { type: "personal" })
        ),
        React.createElement(
          "tbody",
          null,
          this.renderWeeks()
        )
      )
    );
  }
});
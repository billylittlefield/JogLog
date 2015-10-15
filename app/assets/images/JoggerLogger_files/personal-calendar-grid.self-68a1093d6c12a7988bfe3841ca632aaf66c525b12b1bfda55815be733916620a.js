window.PersonalCalendarGrid = React.createClass({
  displayName: "PersonalCalendarGrid",

  getInitialState: function () {
    return {
      date: moment()
    };
  },
  retrieveWorkoutsForMonth: function () {
    ApiUtil.getMonthsWorkoutsByUser(this.state.date.month(), this.state.date.year(), window.CURRENT_USERID);
  },
  componentWillMount: function () {
    this.retrieveWorkoutsForMonth();
  },
  previousMonth: function () {
    this.setState({ date: this.state.date.add(-1, "month") });
    this.retrieveWorkoutsForMonth();
  },
  nextMonth: function () {
    this.setState({ date: this.state.date.add(1, "month") });
    this.retrieveWorkoutsForMonth();
  },
  renderWeeks: function () {
    var weeks = [];
    var displayMonth = this.state.date.clone().month();
    var nextMonth = this.state.date.clone().add(1, "M").month();
    var firstDayOfWeek = this.state.date.clone().startOf("month").day("Sunday");

    while (firstDayOfWeek.month() !== nextMonth) {
      weeks.push(React.createElement(Week, { key: firstDayOfWeek.toString(),
        weekStart: firstDayOfWeek.clone(),
        displayMonth: displayMonth }));
      firstDayOfWeek.add(1, "week");
    }

    return weeks;
  },
  render: function () {
    return React.createElement(
      "table",
      { className: "table calendar-grid" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          { className: "calendar-header" },
          React.createElement(
            "th",
            { colSpan: "2", onClick: this.previousMonth },
            "Prev"
          ),
          React.createElement(
            "th",
            { colSpan: "4" },
            this.state.date.format("MMMM") + " " + this.state.date.format("YYYY")
          ),
          React.createElement(
            "th",
            { colSpan: "2", onClick: this.nextMonth },
            "Next"
          )
        ),
        React.createElement(DayHeaders, null)
      ),
      React.createElement(
        "tbody",
        null,
        this.renderWeeks()
      )
    );
  }
});
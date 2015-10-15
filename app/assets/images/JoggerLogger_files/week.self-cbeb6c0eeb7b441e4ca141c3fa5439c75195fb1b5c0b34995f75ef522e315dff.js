window.Week = React.createClass({
  displayName: "Week",

  renderDays: function () {
    var days = [];
    var currentDay = this.props.weekStart.clone();

    for (var i = 0; i < 7; i++) {
      days.push(React.createElement(Day, { key: currentDay.clone().toString(),
        date: currentDay.clone(),
        displayMonth: this.props.displayMonth }));
      currentDay.add(1, "day");
    }

    days.push(React.createElement(WeekTotals, { key: this.props.key,
      user_id: window.CURRENT_USERID,
      weekStart: this.props.weekStart.clone() }));

    return days;
  },
  render: function () {
    return React.createElement(
      "tr",
      { className: "week" },
      this.renderDays()
    );
  }
});
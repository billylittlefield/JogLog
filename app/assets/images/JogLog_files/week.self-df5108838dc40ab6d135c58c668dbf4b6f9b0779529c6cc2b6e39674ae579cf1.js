window.Week = React.createClass({
  displayName: "Week",

  renderDays: function () {
    var days = [];
    var currentDay = this.props.weekStart.clone();

    if (this.props.type === "team") {
      days.push(React.createElement(UserCell, { key: this.props.key + "_user_" + this.props.user.id,
        user: this.props.user }));
    }

    for (var i = 0; i < 7; i++) {
      days.push(React.createElement(Day, { key: currentDay.clone().toString(),
        userId: this.props.user.id,
        date: currentDay.clone(),
        displayMonth: this.props.displayMonth,
        type: this.props.type }));
      currentDay.add(1, "day");
    }

    days.push(React.createElement(WeekTotals, { key: this.props.key + "_total",
      userId: this.props.user.id,
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
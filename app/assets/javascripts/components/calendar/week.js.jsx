window.Week = React.createClass({
  renderDays: function() {
    var days = [];
    var currentDay = this.props.weekStart.clone();

    for (var i = 0; i < 7; i++) {
      days.push( <Day key={currentDay.clone().toString()}
                      userId={this.props.userId}
                      date={currentDay.clone()}
                      displayMonth={this.props.displayMonth}
                      type={this.props.type} /> );
      currentDay.add(1, "day");
    }

    days.push( <WeekTotals key={this.props.key + "_total"}
                           userId={this.props.userId}
                           weekStart={this.props.weekStart.clone()} /> );

    return days;
  },
  render: function() {
    return (
      <tr className="week">
        {this.renderDays()}
      </tr>
    );
  }
});

window.Week = React.createClass({
  renderDays: function() {
    var days = [];
    var currentDay = this.props.weekStart.clone();

    for (var i = 0; i < 7; i++) {
      days.push( <Day key={currentDay.clone().toString()}
                      date={currentDay.clone()}
                      displayMonth={this.props.displayMonth} /> );
      currentDay.add(1, "day");
    }

    return days;
  },
  render: function() {
    return (
      <div className="week">
        {this.renderDays()}
      </div>
    );
  }
});

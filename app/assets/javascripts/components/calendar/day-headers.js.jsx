window.DayHeaders = React.createClass({
  userHeader: function() {
    if (this.props.type === "team") {
      return (
        <th className="day-header-item teammates-header">Teammates</th>
      );
    }
  },
  render: function() {
    return (
      <tr className="week">
        {this.userHeader()}
        <th className="day-header-item">Sunday</th>
        <th className="day-header-item">Monday</th>
        <th className="day-header-item">Tuesday</th>
        <th className="day-header-item">Wednesday</th>
        <th className="day-header-item">Thursday</th>
        <th className="day-header-item">Friday</th>
        <th className="day-header-item">Saturday</th>
        <th className="day-header-item totals-header">Totals</th>
      </tr>
    );
  }
});

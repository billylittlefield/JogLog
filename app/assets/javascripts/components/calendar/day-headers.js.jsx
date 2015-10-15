window.DayHeaders = React.createClass({
  render: function() {
    return (
      <tr className="week">
        <th className="day-header-item">Sunday</th>
        <th className="day-header-item">Monday</th>
        <th className="day-header-item">Tuesday</th>
        <th className="day-header-item">Wednesday</th>
        <th className="day-header-item">Thursday</th>
        <th className="day-header-item">Friday</th>
        <th className="day-header-item">Saturday</th>
        <th className="day-header-item">Totals</th>
      </tr>
    );
  }
});

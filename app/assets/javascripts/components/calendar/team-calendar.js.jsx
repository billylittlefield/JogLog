window.TeamCalendar = React.createClass({
  getInitialState: function() {
    return {
      weekStart: moment().startOf("week"),
      workoutsForTeam: {}
    };
  },
  componentWillMount: function() {
    this.retrieveTeamWorkoutsForWeek();
  },
  retrieveTeamWorkoutsForWeek: function() {
    ApiUtil.getWeeksWorkoutsByTeam(this.props.params.teamid,
                                  this.state.weekStart.format("YYYY-MM-DD"));
  },
  previousWeek: function() {
    this.setState({ weekStart: this.state.weekStart.subtract(1, "week") });
    this.retrieveTeamWorkoutsForWeek();
  },
  nextWeek: function() {
    this.setState({ weekStart: this.state.weekStart.add(1, "week") });
    this.retrieveTeamWorkoutsForWeek();
  },
  renderWeeks: function() {
    var weeks = [];

  },
  render: function() {
    var weekStart = this.state.weekStart;
    return (
      <div className="calendar-page-container">
        <table className="table calendar-grid">
          <thead>
          <tr className="no-selection calendar-header">
            <th colSpan="2" onClick={this.previousWeek}>&#9664;</th>
            <th colSpan="5">
              {weekStart.format("MMM DD") + " - " +
               weekStart.clone().add(7, "days").format("MMM DD")}
            </th>
            <th colSpan="2" onClick={this.nextWeek}>&#9654;</th>
          </tr>
          <DayHeaders type="team"/>
          </thead>
          <tbody>
            {this.renderWeeks()}
          </tbody>
        </table>
      </div>
    );
  }
});

window.TeamCalendar = React.createClass({
  getInitialState: function() {
    return {
      weekStart: moment().startOf("week"),
      teamWorkouts: {}
    };
  },
  componentDidMount: function() {
    ApiUtil.getWeeksWorkoutsByTeam(this.props.params.teamid,
                                   this.state.weekStart);
  },
  render: function() {
    return (
      <div className="team-calendar">
      </div>
    );
  }
});

window.TeamCalendar = React.createClass({
  getInitialState: function() {
    return {
      weekStart: moment().startOf("week"),
      teamMembers: [],
      teamName: ""
    };
  },
  componentWillMount: function() {
    TeamStore.addTeamMemberChangeListener(this.updateTeamMembers);
    this.retrieveTeamWorkoutsForWeek();
  },
  componentWillUnmount: function() {
    TeamStore.removeTeamMemberChangeListener(this.updateTeamMembers);
  },
  updateTeamMembers: function() {
    this.setState({ teamMembers: TeamStore.teamMembers(),
                    teamName: TeamStore.teamName() });
  },
  retrieveTeamWorkoutsForWeek: function() {
    ApiUtil.getTeamWorkouts(this.props.params.teamid,
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
  componentWillReceiveProps: function(nextProps) {
    ApiUtil.getTeamWorkouts(nextProps.params.teamid,
                            this.state.weekStart.format("YYYY-MM-DD"));
  },
  renderWeeks: function() {
    var weeks = [];
    _.each(this.state.teamMembers, function(member) {
      weeks.push( <Week key={"user" + member.id +
                             "team" + this.props.params.teamid}
                        user={member}
                        weekStart={this.state.weekStart.clone()}
                        type="team" /> );
    }.bind(this));
    return weeks;
  },
  render: function() {
    var weekStart = this.state.weekStart;
    return (
      <div className="calendar-page-container">
        <table className="table calendar-grid">
          <thead>
          <tr className="no-selection calendar-header">
            <th className="team-name" colSpan="3">{this.state.teamName}</th>
            <th colSpan="3">
              <span className="left-arrow" onClick={this.previousWeek}>&#9654;</span>
              <span>{weekStart.format("MMM DD") + " - " +
               weekStart.clone().add(6, "days").format("MMM DD")}</span>
              <span className="right-arrow" onClick={this.nextWeek}>&#9654;</span>
            </th>
            <th className="join-button" colSpan="3">
              <JoinTeamButton weekStart={this.state.weekStart.clone()}
                              teamId={parseInt(this.props.params.teamid)}/>
            </th>
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

window.JoinTeamButton = React.createClass({
  getInitialState: function() {
    return { membership: UserStore.isMember(this.props.teamId) };
  },
  componentWillMount: function() {
    UserStore.addUserTeamsChangeEventListener(this.updateMembership);
  },
  componentWillUnmount: function() {
    UserStore.removeUserTeamsChangeEventListener(this.updateMembership);
  },
  updateMembership: function() {
    this.setState({ membership: UserStore.isMember(this.props.teamId) });
  },
  toggleMembership: function() {
    var teamId = this.props.teamId;
    var weekStart = this.props.weekStart.format("YYYY-MM-DD");
    var type = this.state.membership ? "DELETE" : "POST";
    var success;
    if (type === "DELETE") {
      success = function() { TeamStore.removeMember(window.CURRENT_USERID); };
    } else {
      // refactor to only retrieve single user workouts
      success = function() { ApiUtil.getTeamWorkouts(teamId, weekStart); };
    }
    ApiUtil.toggleMembership(teamId, type, success);
  },
  buttonText: function() {
    return this.state.membership ? <span className="leave">Leave Team</span> :
                                   <span className="join">Join Team</span>;
  },
  buttonClass: function() {
    return this.state.membership ? "join-team-button member" : "join-team-button";
  },
  render: function() {
    return (
      <ReactBootstrap.Button className={this.buttonClass()} onClick={this.toggleMembership}>
        {this.buttonText()}
      </ReactBootstrap.Button>
    );
  }
});

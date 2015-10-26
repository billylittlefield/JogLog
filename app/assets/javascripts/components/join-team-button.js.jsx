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
    if (this.state.membership) {
      return (
        <div>
          <span className="glyphicon glyphicon-minus"></span>
          <span className="leave">&nbsp;Leave Team</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className="glyphicon glyphicon-plus"></span>
          <span className="join">&nbsp;Join Team</span>
        </div>
      );
    }
  },
  buttonClass: function() {
    var klass = "team-button";
    if (this.state.membership) {
      klass += " member";
    }
    return klass;
  },
  render: function() {
    return (
      <div className={this.buttonClass()} onClick={this.toggleMembership}>
        {this.buttonText()}
      </div>
    );
  }
});

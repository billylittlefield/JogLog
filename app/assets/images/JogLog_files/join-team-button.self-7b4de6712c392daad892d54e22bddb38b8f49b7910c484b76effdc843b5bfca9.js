window.JoinTeamButton = React.createClass({
  displayName: "JoinTeamButton",

  getInitialState: function () {
    return { membership: UserStore.isMember(this.props.teamId) };
  },
  componentWillMount: function () {
    UserStore.addUserTeamsChangeEventListener(this.updateMembership);
  },
  componentWillUnmount: function () {
    UserStore.removeUserTeamsChangeEventListener(this.updateMembership);
  },
  updateMembership: function () {
    this.setState({ membership: UserStore.isMember(this.props.teamId) });
  },
  toggleMembership: function () {
    var teamId = this.props.teamId;
    var weekStart = this.props.weekStart.format("YYYY-MM-DD");
    var type = this.state.membership ? "DELETE" : "POST";
    var success;
    if (type === "DELETE") {
      success = function () {
        TeamStore.removeMember(window.CURRENT_USERID);
      };
    } else {
      // refactor to only retrieve single user workouts
      success = function () {
        ApiUtil.getTeamWorkouts(teamId, weekStart);
      };
    }
    ApiUtil.toggleMembership(teamId, type, success);
  },
  buttonText: function () {
    return this.state.membership ? React.createElement(
      "span",
      { className: "leave" },
      "Leave Team"
    ) : React.createElement(
      "span",
      { className: "join" },
      "Join Team"
    );
  },
  bsStyle: function () {
    return this.state.membership ? "danger" : "success";
  },
  render: function () {
    return React.createElement(
      ReactBootstrap.Button,
      { bsStyle: this.bsStyle(),
        onClick: this.toggleMembership },
      this.buttonText()
    );
  }
});
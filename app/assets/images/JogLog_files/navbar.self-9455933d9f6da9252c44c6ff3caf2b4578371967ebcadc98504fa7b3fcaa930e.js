window.Navbar = React.createClass({
  displayName: "Navbar",

  getInitialState: function () {
    return { teams: [], showTeamForm: false };
  },
  handleLogout: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location = "/";
      }
    });
  },
  componentWillMount: function () {
    UserStore.addUserTeamsChangeEventListener(this.updateTeams);
    ApiUtil.getUserData();
  },
  componentWillUnmount: function () {
    UserStore.removeUserTeamsChangeEventListener(this.updateTeams);
  },
  updateTeams: function () {
    this.setState({ teams: UserStore.teams() });
  },
  teamsList: function () {
    if (this.state.teams.length === 0) {
      return React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          null,
          "You are not on any teams!"
        )
      );
    } else {
      return _.map(this.state.teams, (function (team) {
        return React.createElement(
          "li",
          { key: "user" + window.CURRENT_USERID + "team" + team.id },
          React.createElement(
            "a",
            { href: "#/teams/" + team.id },
            team.name
          )
        );
      }).bind(this));
    }
  },
  toggleTeamForm: function () {
    if (this.state.showTeamForm) {
      this.setState({ showTeamForm: false });
    } else {
      this.setState({ showTeamForm: true });
    }
  },
  showTeamList: function () {
    $(".team-list").removeClass("hide");
  },
  hideTeamList: function (e) {
    $(".team-list").addClass("hide");
  },
  render: function () {
    return React.createElement(
      "header",
      { className: "header" },
      React.createElement(
        "nav",
        { className: "navbar-content group" },
        React.createElement(
          "div",
          { className: "logo" },
          React.createElement("img", { src: "assets/running_man.png" }),
          React.createElement(
            "h1",
            null,
            "JogLog"
          )
        ),
        React.createElement(
          "ul",
          { className: "nav-list list-left group" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#/" },
              "Home"
            )
          ),
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#/calendar" },
              "Calendar"
            )
          ),
          React.createElement(
            "li",
            { className: "team-link" },
            React.createElement(
              "a",
              { href: "#" },
              "Teams",
              React.createElement("span", { className: "glyphicon glyphicon-chevron-left" })
            ),
            React.createElement(
              "ul",
              { className: "team-list" },
              this.teamsList(),
              React.createElement("hr", null),
              React.createElement(
                "li",
                { onClick: this.toggleTeamForm },
                React.createElement(
                  "a",
                  { className: "add-team",
                    href: "javascript:void(0)" },
                  "Create New Team"
                )
              ),
              React.createElement(TeamForm, { show: this.state.showTeamForm,
                onHide: this.toggleTeamForm })
            )
          )
        ),
        React.createElement(SearchForm, null),
        React.createElement(
          "ul",
          { className: "nav-list list-right" },
          React.createElement(
            "li",
            null,
            React.createElement(
              "a",
              { href: "#" },
              window.CURRENT_USERNAME
            )
          ),
          React.createElement(
            "li",
            { onClick: this.handleLogout },
            React.createElement(
              "a",
              { href: "#" },
              "Logout"
            )
          )
        )
      )
    );
  }
});
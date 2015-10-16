window.Navbar = React.createClass({
  getInitialState: function() {
    return { teams: [] };
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
  componentWillMount: function() {
    UserStore.addUserTeamsChangeEventListener(this.updateTeams);
    ApiUtil.getTeamsForUser(window.CURRENT_USERID);
  },
  componentWillUnmount: function() {
    UserStore.removeUserTeamsChangeEventListener(this.updateTeams);
  },
  updateTeams: function() {
    this.setState({ teams: UserStore.teams() });
  },
  teamsList: function() {
    return _.map(this.state.teams, function(team) {
      return (
        <li key={"user" + window.CURRENT_USERID + "team" + team.id}>
          <a href={"#/teams/" + team.id}>{team.name}</a>
        </li>);
    }.bind(this));
  },
  render: function () {
    return (
      <nav className="no-selection navbar navbar-custom">
        <ul className="nav navbar-nav navbar-left left-list">
          <li className="logo">JoggerLogger</li>
          <li><a href="#/">Home</a></li>
          <li><a href="#/calendar">Calendar</a></li>
          <li className="doprdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown"
            role="button" aria-haspopup="true" aria-expanded="false">
              Teams
            </a>
            <ul className="dropdown-menu">
              {this.teamsList()}
              <li role="separator" className="divider"></li>
              <li><a href="#">Create New Team</a></li>
            </ul>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right right-list">
          <li><a href="#">{window.CURRENT_USERNAME}</a></li>
          <li onClick={this.handleLogout}><a href="#">Logout</a></li>
        </ul>
      </nav>
    );
  }
});

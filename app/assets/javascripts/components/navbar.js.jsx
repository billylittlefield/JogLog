  window.Navbar = React.createClass({
  getInitialState: function() {
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
  componentWillMount: function() {
    UserStore.addUserTeamsChangeEventListener(this.updateTeams);
    ApiUtil.getUserData();
  },
  componentWillUnmount: function() {
    UserStore.removeUserTeamsChangeEventListener(this.updateTeams);
  },
  updateTeams: function() {
    this.setState({ teams: UserStore.teams() });
  },
  teamsList: function() {
    if (this.state.teams.length === 0) {
      return (<li><p>You are not on any teams!</p></li>);
    } else {
      return _.map(this.state.teams, function(team) {
        return (
          <li key={"user" + window.CURRENT_USERID + "team" + team.id}>
            <a href={"#/teams/" + team.id}>{team.name}</a>
          </li>
        );
      }.bind(this));
    }
  },
  toggleTeamForm: function() {
    if (this.state.showTeamForm) {
      this.setState({ showTeamForm: false });
    } else {
      this.setState({ showTeamForm: true });
    }
  },
  toggleTeamList: function() {
    var $teamList = $(".team-list");
    if ($teamList.hasClass("hide")) {
      $teamList.removeClass("hide");
    } else {
      $teamList.addClass("hide");
    }
  },
  render: function () {
    return (
      <header className="header">
        <nav className="navbar-content group">
          <div className="logo">
              <img src="assets/running_man.png"/>
              <h1>JogLog</h1>
          </div>
          <ul className="nav-list list-left group">
            <li><a href="#/">Home</a></li>
            <li><a href="#/calendar">Calendar</a></li>
            <li className="team-link"><a onClick={this.toggleTeamList} href="#">Teams</a>
              <ul className="team-list hide">
                {this.teamsList()}
                <hr/>
                <li onClick={this.toggleTeamForm}>
                  <a className="add-team"
                     href="javascript:void(0)">Create New Team</a>
                </li>
                <TeamForm show={this.state.showTeamForm}
                          onHide={this.toggleTeamForm} />
              </ul>
            </li>
          </ul>
          <SearchForm />
          <ul className="nav-list list-right">
            <li><a href="#">{window.CURRENT_USERNAME}</a></li>
            <li onClick={this.handleLogout}><a href="#">Logout</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});
$(document).ready(function() {
  $(document).click(function(e){
    $(".search-input").val("");
    $(".search-results-list").addClass("hide");
    $(".team-list").addClass("hide");
  });
});

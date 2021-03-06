  window.Navbar = React.createClass({
  getInitialState: function() {
    return { teams: [], showTeamForm: false, showWorkoutForm: false };
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
      return (<li><span>You are not on any teams!</span></li>);
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
  showTeamList: function() {
    $(".team-list").removeClass("hide");
  },
  hideTeamList: function(e) {
    $(".team-list").addClass("hide");
  },
  toggleModal: function() {
    this.setState({ showWorkoutForm: !this.state.showWorkoutForm });
  },
  workoutModal: function() {
    return (
      <Modal
        show={this.state.showWorkoutForm}
        onHide={this.toggleModal}>
        <button onClick={this.toggleModal} className="close" aria-label="Close">
          <span aria-hidden="true" >×</span>
        </button>
        <WorkoutForm onHide={this.toggleModal}
                     type="POST"
                     workout={WorkoutConstants.BLANK_WORKOUT}/>
      </Modal>
    );
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
            <li><a href="javascript:void(0)"
                   onClick={this.toggleModal}>Log Workout</a></li>
                {this.workoutModal()}
            <li><a href="#/calendar">My Calendar</a></li>
            <li className="team-link"><a href="javascript:void(0)">My Teams 
              <span className="glyphicon glyphicon-chevron-down"></span></a>
              <ul className="team-list">
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
            <li><a className="username" href="javascript:void(0)">{window.CURRENT_USERNAME}</a></li>
            <li onClick={this.handleLogout}><a href="javascript:void(0)">Logout</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});

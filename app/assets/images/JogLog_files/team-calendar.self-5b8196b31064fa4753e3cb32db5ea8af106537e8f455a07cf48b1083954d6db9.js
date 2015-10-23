window.TeamCalendar = React.createClass({
  displayName: "TeamCalendar",

  getInitialState: function () {
    return {
      weekStart: moment().startOf("week"),
      teamMembers: [],
      teamName: ""
    };
  },
  componentWillMount: function () {
    TeamStore.addTeamMemberChangeListener(this.updateTeamMembers);
    this.retrieveTeamWorkoutsForWeek();
  },
  componentWillUnmount: function () {
    TeamStore.removeTeamMemberChangeListener(this.updateTeamMembers);
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.getUserData();
    ApiUtil.getTeamWorkouts(nextProps.params.teamid, this.state.weekStart.format("YYYY-MM-DD"));
  },
  updateTeamMembers: function () {
    this.setState({ teamMembers: TeamStore.teamMembers(),
      teamName: TeamStore.teamName() });
  },
  retrieveTeamWorkoutsForWeek: function () {
    ApiUtil.getTeamWorkouts(this.props.params.teamid, this.state.weekStart.format("YYYY-MM-DD"));
  },
  previousWeek: function () {
    this.setState({ weekStart: this.state.weekStart.subtract(1, "week") });
    this.retrieveTeamWorkoutsForWeek();
  },
  nextWeek: function () {
    this.setState({ weekStart: this.state.weekStart.add(1, "week") });
    this.retrieveTeamWorkoutsForWeek();
  },
  renderWeeks: function () {
    var weeks = [];
    _.each(this.state.teamMembers, (function (member) {
      weeks.push(React.createElement(Week, { key: "user" + member.id + "team" + this.props.params.teamid,
        user: member,
        weekStart: this.state.weekStart.clone(),
        type: "team" }));
    }).bind(this));
    return weeks;
  },
  render: function () {
    var weekStart = this.state.weekStart;
    return React.createElement(
      "div",
      { className: "calendar-page-container" },
      React.createElement(
        "table",
        { className: "table calendar-grid" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            { className: "no-selection calendar-header" },
            React.createElement(
              "th",
              { className: "team-name", colSpan: "3" },
              this.state.teamName
            ),
            React.createElement(
              "th",
              { colSpan: "3" },
              React.createElement(
                "span",
                { className: "team-left-arrow", onClick: this.previousWeek },
                "▶"
              ),
              React.createElement(
                "span",
                null,
                weekStart.format("MMM DD") + " - " + weekStart.clone().add(6, "days").format("MMM DD")
              ),
              React.createElement(
                "span",
                { className: "team-right-arrow", onClick: this.nextWeek },
                "▶"
              )
            ),
            React.createElement(
              "th",
              { className: "join-button", colSpan: "3" },
              React.createElement(JoinTeamButton, { weekStart: this.state.weekStart.clone(),
                teamId: parseInt(this.props.params.teamid) })
            )
          ),
          React.createElement(DayHeaders, { type: "team" })
        ),
        React.createElement(
          "tbody",
          null,
          this.renderWeeks()
        )
      )
    );
  }
});
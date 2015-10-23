window.Leaderboard = React.createClass({
  displayName: "Leaderboard",

  getInitialState: function () {
    return {
      // last_week: LeaderboardStore.last_week(),
      // last_month: LeaderboardStore.last_month(),
      // current_month: LeaderboardStore.current_month(),
      // current_year: LeaderboardStore.current_year()
    };
  },
  componentWillMount: function () {
    ApiUtil.getLeaderboards();
    LeaderboardStore.addLeaderboardChangeEventListener(this.updateLeaderboards);
  },
  componentWillUnmount: function () {
    LeaderboardStore.removeLeaderboardChangeEventListener(this.updateLeaderboards);
  },
  updateLeaderboards: function () {
    this.setState({
      last_week: LeaderboardStore.last_week(),
      last_month: LeaderboardStore.last_month(),
      current_month: LeaderboardStore.current_month(),
      current_year: LeaderboardStore.current_year()
    });
  },
  renderTable: function (list) {
    return React.createElement(
      "table",
      { className: "table" },
      _.map(list, function (row, index) {
        return React.createElement(
          "tr",
          { key: index },
          React.createElement(
            "td",
            null,
            index + 1
          ),
          React.createElement(
            "td",
            null,
            row.username
          ),
          React.createElement(
            "td",
            null,
            row.sum + " miles"
          )
        );
      })
    );
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Leaderboards"
      ),
      React.createElement(
        ReactBootstrap.PanelGroup,
        { defaultActiveKey: "1", accordion: true },
        React.createElement(
          ReactBootstrap.Panel,
          { className: "leader-panel", header: "Most Miles in last 7 Days", eventKey: "1" },
          this.renderTable(this.state.last_week)
        ),
        React.createElement(
          ReactBootstrap.Panel,
          { className: "leader-panel", header: "Most Miles in last 30 Days", eventKey: "2" },
          this.renderTable(this.state.last_month)
        ),
        React.createElement(
          ReactBootstrap.Panel,
          { className: "leader-panel", header: "Most Miles in " + moment().format("MMMM YYYY"), eventKey: "3" },
          this.renderTable(this.state.current_month)
        ),
        React.createElement(
          ReactBootstrap.Panel,
          { className: "leader-panel", header: "Most Miles in " + moment().format("YYYY"), eventKey: "4" },
          this.renderTable(this.state.current_year)
        )
      )
    );
  }
});
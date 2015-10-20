window.Leaderboard = React.createClass({
  getInitialState: function() {
    return {
      // last_week: LeaderboardStore.last_week(),
      // last_month: LeaderboardStore.last_month(),
      // current_month: LeaderboardStore.current_month(),
      // current_year: LeaderboardStore.current_year()
    };
  },
  componentWillMount: function() {
    ApiUtil.getLeaderboards();
    LeaderboardStore.addLeaderboardChangeEventListener(this.updateLeaderboards);
  },
  componentWillUnmount: function() {
    LeaderboardStore.removeLeaderboardChangeEventListener(this.updateLeaderboards);
  },
  updateLeaderboards: function() {
    this.setState({
      last_week: LeaderboardStore.last_week(),
      last_month: LeaderboardStore.last_month(),
      current_month: LeaderboardStore.current_month(),
      current_year: LeaderboardStore.current_year()
    });
  },
  render: function() {
    return (
      <div>
        <h1>Leaderboards</h1>
        <ReactBootstrap.PanelGroup defaultActiveKey="1" accordion>
          <ReactBootstrap.Panel header="Most Miles in last 7 Days" eventKey="1">
            {this.state.last_week}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel header="Most Miles in last 30 Days" eventKey="2">
            SOME STUFF OVER HERE
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel header={"Most Miles in " + moment().format("MMMM YYYY")} eventKey="3">
          AND ALSO HERE
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel header={"Most Miles in " + moment().format("YYYY")} eventKey="4">
          AND ALSO HERE
          </ReactBootstrap.Panel>
        </ReactBootstrap.PanelGroup>
      </div>
    );
  }
});

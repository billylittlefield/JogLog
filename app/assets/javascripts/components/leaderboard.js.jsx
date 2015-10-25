window.Leaderboard = React.createClass({
  getInitialState: function() {
    return {
      last_week: LeaderboardStore.last_week(),
      last_month: LeaderboardStore.last_month(),
      current_month: LeaderboardStore.current_month(),
      current_year: LeaderboardStore.current_year()
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
  renderTable: function(list) {
    return (
      <table className="table">{
      _.map(list, function(row, index) {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.username}</td>
            <td>{row.sum + " miles"}</td>
          </tr>
        );
      })}</table>
    );
  },
  render: function() {
    return (
      <div className="leaderboard-wrapper">
        <h1>Leaderboards</h1>
        <LeaderboardFilter />
        <ReactBootstrap.PanelGroup defaultActiveKey="1" accordion>
          <ReactBootstrap.Panel className="leader-panel" header="Most Miles in last 7 Days" eventKey="1">
            {this.renderTable(this.state.last_week)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header="Most Miles in last 30 Days" eventKey="2">
            {this.renderTable(this.state.last_month)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header={"Most Miles in " + moment().format("MMMM YYYY")} eventKey="3">
            {this.renderTable(this.state.current_month)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header={"Most Miles in " + moment().format("YYYY")} eventKey="4">
            {this.renderTable(this.state.current_year)}
          </ReactBootstrap.Panel>
        </ReactBootstrap.PanelGroup>
      </div>
    );
  }
});

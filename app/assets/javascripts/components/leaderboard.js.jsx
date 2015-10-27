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
    LeaderboardStore.addLeaderboardChangeEventListener(this.updateLeaderboards);
    ApiUtil.getLeaderboards({ activity: "Running",
                              gender: window.CURRENT_USER_GENDER,
                              group: "All Users" });
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
    if (list.length > 0) {
      return (
        <table className="table">
          <tbody>{
        _.map(list, function(row, index) {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><a href={"#/users/" + row.id}>{row.username}</a></td>
              <td>{row.sum + " miles"}</td>
            </tr>
          );
        })}</tbody>
        </table>
      );
    } else {
      return (<span>No data logged</span>);
    }
  },
  render: function() {
    return (
      <div className="leaderboard-wrapper">
        <h1>Leaderboards</h1>
        <hr/>
        <LeaderboardFilter />
        <ReactBootstrap.PanelGroup>
          <ReactBootstrap.Panel className="leader-panel" header="Most Distance: Last 7 Days" eventKey="1">
            {this.renderTable(this.state.last_week)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header="Most Distance: Last 30 Days" eventKey="2">
            {this.renderTable(this.state.last_month)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header={"Most Distance: " + moment().format("MMMM YYYY")} eventKey="3">
            {this.renderTable(this.state.current_month)}
          </ReactBootstrap.Panel>
          <ReactBootstrap.Panel className="leader-panel" header={"Most Distance: " + moment().format("YYYY")} eventKey="4">
            {this.renderTable(this.state.current_year)}
          </ReactBootstrap.Panel>
        </ReactBootstrap.PanelGroup>
      </div>
    );
  }
});

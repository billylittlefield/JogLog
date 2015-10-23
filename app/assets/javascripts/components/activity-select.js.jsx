window.ActivitySelect = React.createClass({
  getInitialState: function() {
    return { activity: "Run",
             showList: false };
  },
  activities: ["Run", "Bike", "Swim", "Walk", "Elliptical", "Exercise Bike",
               "Nordic Skiing", "Rowing", "Hiking", "Rollerblading"],
  toggleList: function() {
    this.setState({ showList: !this.state.showList });
  },
  changeSelected: function(e) {
    this.setState({ activity: e.target.innerText });
  },
  renderList: function() {
    if (this.state.showList) {
      var currentActivity = this.state.activity;
      return (
        <ul className="activity-list">
          {_.map(this.activities, function(activity) {
            if (activity === currentActivity) {
              return (<li key={"activity-select_"+activity}
                          onClick={this.changeSelected}
                          className="activity-item selected-activity">
                        {activity}
                      </li>);
            } else {
              return (<li key={"activity-select_"+activity}
                          onClick={this.changeSelected}
                          className="activity-item">{activity}</li>);
            }
          }.bind(this))}
        </ul>
      );
    } else {
      return;
    }
  },
  render: function() {
    return (
      <div onClick={this.toggleList} className="activity-select-container">
        <div className="activity-select">
          {this.state.activity}
          <span className="glyphicon glyphicon-chevron-left"></span>
        </div>
        {this.renderList()}
      </div>
    );
  }
});

window.ActivitySelect = React.createClass({
  getInitialState: function() {
    return { activity: "Run",
             showList: false };
  },
  activities: ["Run", "Bike", "Swim", "Walk", "Elliptical", "Exercise Bike",
               "Nordic Skiing", "Rowing", "Hiking", "Rollerblading"],
  toggleList: function() {
    if (this.state.showList) {
      $(".activity-select").removeClass("expanded");
    } else {
      $(".activity-select").addClass("expanded");
    }
    this.setState({ showList: !this.state.showList });
  },
  changeSelected: function(e) {
    var newActivity = e.target.innerText;
    this.setState({ activity: newActivity });
    this.props.bubbleState(newActivity);
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
                          className="activity-item">
                        <span className="glyphicon glyphicon-ok"></span>
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
        <div className="activity-select workout-input">
          {this.state.activity}
          <span className="glyphicon glyphicon-chevron-left"></span>
        </div>
        {this.renderList()}
      </div>
    );
  }
});

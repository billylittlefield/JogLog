window.ActivitySelect = React.createClass({
  displayName: "ActivitySelect",

  getInitialState: function () {
    return { activity: "Run",
      showList: false };
  },
  activities: ["Run", "Bike", "Swim", "Walk", "Elliptical", "Exercise Bike", "Nordic Skiing", "Rowing", "Hiking", "Rollerblading"],
  toggleList: function () {
    if (this.state.showList) {
      $(".activity-select").removeClass("expanded");
    } else {
      $(".activity-select").addClass("expanded");
    }
    this.setState({ showList: !this.state.showList });
  },
  changeSelected: function (e) {
    var newActivity = e.target.innerText;
    this.setState({ activity: newActivity });
    this.props.bubbleState(newActivity);
  },
  renderList: function () {
    if (this.state.showList) {
      var currentActivity = this.state.activity;
      return React.createElement(
        "ul",
        { className: "activity-list" },
        _.map(this.activities, (function (activity) {
          if (activity === currentActivity) {
            return React.createElement(
              "li",
              { key: "activity-select_" + activity,
                onClick: this.changeSelected,
                className: "activity-item" },
              React.createElement("span", { className: "glyphicon glyphicon-ok" }),
              activity
            );
          } else {
            return React.createElement(
              "li",
              { key: "activity-select_" + activity,
                onClick: this.changeSelected,
                className: "activity-item" },
              activity
            );
          }
        }).bind(this))
      );
    } else {
      return;
    }
  },
  render: function () {
    return React.createElement(
      "div",
      { onClick: this.toggleList, className: "activity-select-container" },
      React.createElement(
        "div",
        { className: "activity-select workout-input" },
        this.state.activity,
        React.createElement("span", { className: "glyphicon glyphicon-chevron-left" })
      ),
      this.renderList()
    );
  }
});
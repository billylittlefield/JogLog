window.WeekTotals = React.createClass({
  displayName: "WeekTotals",

  getInitialState: function () {
    return {
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart, this.props.userId),
      displayIdx: 0
    };
  },
  sortedTotals: function () {
    var sortedTotals = {};
    this.state.weekWorkouts.forEach(function (workout) {
      var activity = workout.activity;
      if (sortedTotals[activity]) {
        sortedTotals[activity].duration.add(moment.duration(workout.duration));
        sortedTotals[activity].distance += workout.distance;
      } else {
        sortedTotals[activity] = {
          duration: moment.duration(workout.duration),
          distance: workout.distance
        };
      }
    });
    return sortedTotals;
  },
  componentWillMount: function () {
    WorkoutStore.addCalendarChangeListener(this.updateWeekTotals);
  },
  componentWillUnmount: function () {
    WorkoutStore.removeCalendarChangeListener(this.updateWeekTotals);
  },
  updateWeekTotals: function () {
    this.setState({
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart, this.props.userId)
    });
  },
  prevActivity: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ? _.keys(this.sortedTotals()).length - 1 : currentIdx - 1;
    this.setState({ displayIdx: newIdx });
  },
  nextActivity: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === _.keys(this.sortedTotals()).length - 1 ? 0 : currentIdx + 1;
    this.setState({ displayIdx: newIdx });
  },
  multiActivityHeader: function () {
    var allTotals = this.sortedTotals();
    if (_.keys(allTotals).length > 1) {
      return React.createElement(
        "div",
        { className: "multi-workout-header" },
        React.createElement(
          "span",
          { className: "workout-toggle" },
          React.createElement(
            "span",
            { onClick: this.prevActivity },
            "◀"
          ),
          React.createElement(
            "span",
            null,
            React.createElement(
              "b",
              null,
              " " + _.keys(allTotals)[this.state.displayIdx] + " "
            )
          ),
          React.createElement(
            "span",
            { onClick: this.nextActivity },
            "▶"
          )
        )
      );
    } else {
      return React.createElement(
        "div",
        { className: "multi-workout-header" },
        React.createElement(
          "b",
          null,
          _.keys(this.sortedTotals())[0]
        )
      );
    }
  },
  distanceTotal: function (distanceTotal) {
    if (distanceTotal !== 0) {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        "Distance: " + distanceTotal
      );
    }
  },
  durationTotal: function (durationTotal) {
    if (durationTotal !== "0") {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        "Time: " + durationTotal
      );
    }
  },
  activityTotals: function () {
    var allTotals = this.sortedTotals();
    if (!_.isEmpty(allTotals)) {
      var displayActivity = _.keys(allTotals)[this.state.displayIdx];
      return React.createElement(
        "div",
        { className: "workout-item" },
        this.distanceTotal(allTotals[displayActivity].distance),
        this.durationTotal(allTotals[displayActivity].duration.format("h:mm:ss"))
      );
    }
  },
  render: function () {
    return React.createElement(
      "td",
      { className: "no-selection day week-totals" },
      this.multiActivityHeader(),
      this.activityTotals()
    );
  }
});
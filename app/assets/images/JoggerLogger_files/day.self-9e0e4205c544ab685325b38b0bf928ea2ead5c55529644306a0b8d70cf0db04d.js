window.Day = React.createClass({
  displayName: "Day",

  getInitialState: function () {
    return { workouts: [],
      displayIdx: 0 };
  },
  componentWillMount: function () {
    WorkoutStore.AddCalendarChangeListener(this.fetchWorkouts);
  },
  componentWillUnmount: function () {
    WorkoutStore.removeCalendarChangeListener(this.fetchWorkouts);
  },
  fetchWorkouts: function () {
    this.setState({
      workouts: WorkoutStore.retrieveWorkoutsForDate(this.props.date)
    });
  },
  monthClass: function () {
    var klass = "day";
    if (this.props.displayMonth === this.props.date.month()) {
      klass += " current-month";
    } else {
      klass += " neighbor-month";
    }
    return klass;
  },
  prevWorkout: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ? this.state.workouts.length - 1 : currentIdx - 1;
    this.setState({ displayIdx: newIdx });
  },
  nextWorkout: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === this.state.workouts.length - 1 ? 0 : currentIdx + 1;
    this.setState({ displayIdx: newIdx });
  },
  multiWorkoutHeader: function () {
    if (this.state.workouts.length > 1) {
      return React.createElement(
        "div",
        { className: "multi-workout-header" },
        React.createElement(
          "span",
          { className: "day-number" },
          React.createElement(
            "b",
            null,
            this.props.date.date()
          )
        ),
        React.createElement(
          "span",
          { className: "workout-toggle" },
          React.createElement(
            "span",
            { onClick: this.prevWorkout },
            "◁"
          ),
          React.createElement(
            "span",
            null,
            this.state.displayIdx + 1 + " of " + this.state.workouts.length
          ),
          React.createElement(
            "span",
            { onClick: this.nextWorkout },
            "▷"
          )
        )
      );
    } else {
      return React.createElement(
        "span",
        { className: "day-number" },
        React.createElement(
          "b",
          null,
          this.props.date.date()
        )
      );
    }
  },
  workoutItemDistance: function (activeWorkout) {
    if (activeWorkout.distance !== 0) {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Miles: "
        ),
        activeWorkout.distance
      );
    }
  },
  workoutItemTime: function (activeWorkout) {
    if (activeWorkout.duration.substring(11, 19) !== "00:00:00") {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        React.createElement(
          "b",
          null,
          "Time: "
        ),
        activeWorkout.duration.stylizeDuration()
      );
    }
  },
  workoutItem: function () {
    if (this.state.workouts.length > 0) {
      var activeWorkout = this.state.workouts[this.state.displayIdx];
      return React.createElement(
        "div",
        { className: "workout-item" },
        React.createElement(
          "span",
          null,
          React.createElement(
            "b",
            null,
            activeWorkout.title
          )
        ),
        React.createElement("br", null),
        React.createElement(
          "span",
          null,
          React.createElement(
            "b",
            null,
            "Activity: "
          ),
          activeWorkout.activity
        ),
        this.workoutItemTime(activeWorkout),
        this.workoutItemDistance(activeWorkout)
      );
    }
  },
  render: function () {
    return React.createElement(
      "td",
      { className: this.monthClass() },
      this.multiWorkoutHeader(),
      this.workoutItem()
    );
  }
});
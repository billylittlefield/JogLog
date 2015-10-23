window.Day = React.createClass({
  displayName: "Day",

  getInitialState: function () {
    return { dayWorkouts: WorkoutStore.workoutsForDay(this.props.date, this.props.userId),
      displayIdx: 0,
      showModal: false };
  },
  componentWillMount: function () {
    WorkoutStore.addCalendarChangeListener(this.fetchWorkouts);
  },
  componentWillUnmount: function () {
    WorkoutStore.removeCalendarChangeListener(this.fetchWorkouts);
  },
  fetchWorkouts: function () {
    this.setState({
      dayWorkouts: WorkoutStore.workoutsForDay(this.props.date, this.props.userId)
    });
  },
  monthClass: function () {
    var klass = "day no-selection";
    if (this.props.type === "personal" && this.props.displayMonth !== this.props.date.month()) {
      klass += " neighbor-month";
    }
    return klass;
  },
  prevWorkout: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ? this.state.dayWorkouts.length - 1 : currentIdx - 1;
    this.setState({ displayIdx: newIdx });
  },
  nextWorkout: function () {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === this.state.dayWorkouts.length - 1 ? 0 : currentIdx + 1;
    this.setState({ displayIdx: newIdx });
  },
  multiWorkoutHeader: function () {
    if (this.state.dayWorkouts.length > 1) {
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
          "div",
          { className: "workout-toggle" },
          React.createElement(
            "span",
            { onClick: this.prevWorkout },
            "◀"
          ),
          React.createElement(
            "span",
            null,
            " " + (this.state.displayIdx + 1) + " of " + this.state.dayWorkouts.length + " "
          ),
          React.createElement(
            "span",
            { onClick: this.nextWorkout },
            "▶"
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
  workoutItemDistance: function (displayWorkout) {
    if (displayWorkout.distance !== 0) {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        displayWorkout.activity + ": " + displayWorkout.distance + " miles"
      );
    }
  },
  workoutItemTime: function (displayWorkout) {
    if (displayWorkout.duration.substring(11, 19) !== "00:00:00") {
      return React.createElement(
        "span",
        null,
        React.createElement("br", null),
        displayWorkout.activity + " time: " + moment.duration(displayWorkout.duration).format("h:mm:ss")
      );
    }
  },
  workoutItem: function () {
    if (this.state.dayWorkouts.length > 0) {
      var displayWorkout = this.state.dayWorkouts[this.state.displayIdx];
      return React.createElement(
        "div",
        { onClick: this.toggleModal, className: "workout-item" },
        React.createElement(
          "span",
          null,
          React.createElement(
            "b",
            null,
            displayWorkout.title
          )
        ),
        this.workoutItemDistance(displayWorkout),
        this.workoutItemTime(displayWorkout)
      );
    } else {
      return React.createElement("div", { onClick: this.toggleModal, className: "workout-item" });
    }
  },
  toggleModal: function () {
    var workout = this.state.dayWorkouts[this.state.displayIdx];
    if (workout) {
      ApiUtil.getCommentsForWorkout(workout.id);
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  },
  workoutModal: function () {
    var workout = this.state.dayWorkouts[this.state.displayIdx] || WorkoutConstants.BLANK_WORKOUT;
    var adjustedWorkout = $.extend(true, {}, workout);
    adjustedWorkout.date = this.props.date.format("YYYY-MM-DD");
    if (adjustedWorkout.duration !== "0:00:00") {
      adjustedWorkout.duration = moment.duration(workout.duration).format("h:mm:ss");
    }
    if (this.props.userId === window.CURRENT_USERID) {
      var type = workout.id ? "PATCH" : "POST";
      return React.createElement(EditWorkoutDetail, {
        show: this.state.showModal,
        onHide: this.toggleModal,
        type: type,
        workout: adjustedWorkout });
    } else {
      if (workout.id) {
        return React.createElement(ViewWorkoutDetail, {
          show: this.state.showModal,
          onHide: this.toggleModal,
          workout: adjustedWorkout });
      }
    }
  },
  render: function () {
    return React.createElement(
      "td",
      { className: this.monthClass() },
      this.multiWorkoutHeader(),
      this.workoutItem(),
      this.workoutModal()
    );
  }
});
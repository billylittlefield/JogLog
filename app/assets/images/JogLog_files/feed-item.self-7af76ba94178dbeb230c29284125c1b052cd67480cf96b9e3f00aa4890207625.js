window.FeedItem = React.createClass({
  displayName: "FeedItem",

  getInitialState: function () {
    return { showModal: false };
  },
  renderHeader: function (workout) {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "b",
        null,
        React.createElement(
          "a",
          { href: "#/users/" + workout.user_id },
          workout.user_username
        )
      ),
      ": ",
      workout.title
    );
  },
  renderDate: function (workout) {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "DATE"
      ),
      moment(workout.date).add(12, "hours").format("MM/DD/YY")
    );
  },
  renderDistance: function (workout) {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "DISTANCE"
      ),
      workout.distance + " miles"
    );
  },
  renderDuration: function (workout) {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "DURATION"
      ),
      moment.duration(workout.duration).format("h:mm:ss")
    );
  },
  renderPace: function (workout) {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        null,
        "PACE"
      ),
      moment.duration(moment.duration(workout.duration) / workout.distance).format("h:mm:ss")
    );
  },
  toggleModal: function () {
    ApiUtil.getCommentsForWorkout(this.props.workout.id);
    if (this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  },
  workoutModal: function () {
    var workout = this.props.workout;
    var adjustedWorkout = $.extend(true, {}, workout);
    adjustedWorkout.date = moment(workout.date).format("YYYY-MM-DD");
    adjustedWorkout.duration = moment.duration(workout.duration).format("h:mm:ss");
    if (adjustedWorkout.user_id === window.CURRENT_USERID) {
      var type = workout.id ? "PATCH" : "POST";
      return React.createElement(EditWorkoutDetail, {
        show: this.state.showModal,
        onHide: this.toggleModal,
        type: type,
        workout: adjustedWorkout });
    } else {
      return React.createElement(ViewWorkoutDetail, {
        show: this.state.showModal,
        onHide: this.toggleModal,
        workout: adjustedWorkout });
    }
  },
  render: function () {
    var workout = this.props.workout;
    return React.createElement(
      "li",
      { onClick: this.toggleModal, className: "feed-item" },
      React.createElement(
        "table",
        { className: "table" },
        React.createElement(
          "tbody",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              { className: "feed-item-header",
                colSpan: "4" },
              this.renderHeader(workout)
            )
          ),
          React.createElement(
            "tr",
            null,
            React.createElement(
              "td",
              null,
              this.renderDate(workout)
            ),
            React.createElement(
              "td",
              null,
              this.renderDistance(workout)
            ),
            React.createElement(
              "td",
              null,
              this.renderDuration(workout)
            ),
            React.createElement(
              "td",
              null,
              this.renderPace(workout)
            )
          )
        )
      ),
      this.workoutModal()
    );
  }
});
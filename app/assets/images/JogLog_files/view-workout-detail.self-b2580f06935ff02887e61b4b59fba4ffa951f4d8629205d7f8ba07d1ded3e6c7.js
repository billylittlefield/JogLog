var Modal = ReactBootstrap.Modal;
window.ViewWorkoutDetail = React.createClass({
  displayName: "ViewWorkoutDetail",

  render: function () {
    var adjustedWorkout = $.extend(true, {}, this.props.workout);
    adjustedWorkout.date = moment(adjustedWorkout.date).format("YYYY-MM-DD");
    adjustedWorkout.duration = moment.duration(adjustedWorkout.duration).format("h:mm:ss");
    return React.createElement(
      Modal,
      {
        show: this.props.show,
        onHide: this.props.onHide,
        workout: this.props.workout },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        "View Workout Detail"
      ),
      React.createElement(WorkoutForm, { mode: "view", workout: adjustedWorkout }),
      React.createElement(Comments, { workoutId: this.props.workout.id })
    );
  }
});
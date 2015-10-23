var Modal = ReactBootstrap.Modal;

window.EditWorkoutDetail = React.createClass({
  displayName: "EditWorkoutDetail",

  render: function () {

    var headerText = this.props.type === "PATCH" ? "Edit" : "New";
    return React.createElement(
      Modal,
      {
        show: this.props.show,
        onHide: this.props.onHide,
        workout: this.props.workout },
      React.createElement(
        Modal.Header,
        { closeButton: true },
        headerText + " Workout Detail"
      ),
      React.createElement(WorkoutForm, { type: this.props.type, workout: this.props.workout }),
      React.createElement(Comments, { workoutId: this.props.workout.id })
    );
  }
});
var Modal = ReactBootstrap.Modal;
window.ViewWorkoutDetail = React.createClass({
  render: function() {
    var adjustedWorkout = $.extend(true, {}, this.props.workout);
    adjustedWorkout.date = moment(adjustedWorkout.date).format("YYYY-MM-DD");
    adjustedWorkout.duration = moment.duration(adjustedWorkout.duration)
                                     .format("h:mm:ss");
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        workout={this.props.workout}>
        <Modal.Header closeButton>
        View Workout Detail
        </Modal.Header>
        <WorkoutForm mode="view" workout={adjustedWorkout}/>
        <Comments workoutId={this.props.workout.id}/>
      </Modal>
    );
  }
});

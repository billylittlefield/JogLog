var Modal = ReactBootstrap.Modal;

window.EditWorkoutDetail = React.createClass({
  render: function() {

    var headerText = this.props.type === "PATCH" ? "Edit" : "New";
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        workout={this.props.workout}>
        <Modal.Header closeButton>
        {headerText + " Workout"}
        </Modal.Header>
        <WorkoutForm type={this.props.type} workout={this.props.workout}/>
        <Comments workoutId={this.props.workout.id}/>
      </Modal>
    );
  }
});

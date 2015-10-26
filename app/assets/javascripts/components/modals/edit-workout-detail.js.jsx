var Modal = ReactBootstrap.Modal;

window.EditWorkoutDetail = React.createClass({
  render: function() {

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        workout={this.props.workout}>
        <button className="close" aria-label="Close">
          <span aria-hidden="true" >×</span>
        </button>
        <WorkoutForm type={this.props.type} workout={this.props.workout}/>
        <div className="view-comments-wrapper">
          <FeedItemComments workoutId={this.props.workout.id}
                            comments={this.props.workout.comments}/>
        </div>
      </Modal>
    );
  }
});

var Modal = ReactBootstrap.Modal;

window.EditWorkoutDetail = React.createClass({
  comments: function() {
    if (this.props.type == "PATCH") {
      return (
        <div className="view-comments-wrapper">
          <FeedItemComments workoutId={this.props.workout.id}
                            comments={this.props.workout.comments}/>
        </div>
      );
    }
  },
  render: function() {

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        workout={this.props.workout}>
        <button onClick={this.props.onHide} className="close" aria-label="Close">
          <span aria-hidden="true" >×</span>
        </button>
        <WorkoutForm onHide={this.props.onHide}
                     type={this.props.type}
                     workout={this.props.workout}/>
       {this.comments()}
      </Modal>
    );
  }
});

var Modal = ReactBootstrap.Modal;
window.ViewWorkoutDetail = React.createClass({
  render: function() {
    var adjustedWorkout = $.extend(true, {}, this.props.workout);
    adjustedWorkout.date = moment(adjustedWorkout.date).format("MMM DD, YYYY");
    adjustedWorkout.duration = moment.duration(adjustedWorkout.duration)
                                     .format("h:mm:ss");
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        workout={this.props.workout}>
        <button onClick={this.props.onHide} className="close" aria-label="Close">
          <span aria-hidden="true" >×</span>
        </button>


        <div className="form-wrapper view-wrapper">
          <h1>{this.props.userName + "'s workout"}</h1>
          <hr/>
          <div className="workout-form view-workout">
            <div className="full-input input-group">
              <label className="view-label"
                     htmlFor="workout-title">Workout Title</label>
              <div className="view-content">{adjustedWorkout.title}</div>
            </div>
            <div className="left-input input-group">
              <label className="view-label"
                     htmlFor="workout_date">Date</label>
              <div className="view-content">{adjustedWorkout.date}</div>
            </div>
            <div className="right-input input-group">
              <label className="view-label"
                     htmlFor="workout_activity">Activity</label>
              <div className="view-content">{adjustedWorkout.activity}</div>
            </div>
            <div className="left-input input-group">
              <label className="view-label"
                     htmlFor="distance">Distance</label>
              <div className="view-content">{adjustedWorkout.distance + " miles"}</div>
            </div>
            <div className="right-input input-group group">
              <label className="view-label"
                     htmlFor="duration">Duration</label>
              <div className="view-content">{adjustedWorkout.duration}</div>
            </div>
            <div className="full-input input-group">
              <label className="view-label"
                     htmlFor="workout_notes">Notes</label>
              <div className="view-content view-notes">{adjustedWorkout.notes || "No notes logged"}</div>
            </div>
          </div>
          <hr/>
        </div>
        <div className="view-comments-wrapper">
          <FeedItemComments workoutId={adjustedWorkout.id}
                            comments={adjustedWorkout.comments}/>
        </div>
      </Modal>
    );
  }
});

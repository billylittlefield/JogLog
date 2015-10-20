window.FeedItem = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  renderHeader: function(workout) {
    return (
      <div>
        <b>
          <a href={"#/users/" + workout.user_id}>{workout.user_username}</a>
        </b>: {workout.title}
      </div>
    );
  },
  renderDate: function(workout) {
    return (
      <div>
        <h4>DATE</h4>
        {moment(workout.date).format("MM/DD/YY")}
      </div>
    );
  },
  renderDistance: function(workout) {
    return (
      <div>
        <h4>DISTANCE</h4>
        {workout.distance + " miles"}
      </div>
    );
  },
  renderDuration: function(workout) {
    return (
      <div>
        <h4>DURATION</h4>
        {moment.duration(workout.duration).format("h:mm:ss")}
      </div>
    );
  },
  renderPace: function(workout) {
    return (
      <div>
        <h4>PACE</h4>
        {moment.duration(moment.duration(workout.duration) / workout.distance)
          .format("h:mm:ss")}
      </div>
    );
  },
  toggleModal: function() {
    ApiUtil.getCommentsForWorkout(this.props.workout.id);
    if (this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  },
  workoutModal: function() {
    var workout = this.props.workout;
    var adjustedWorkout = $.extend(true, {}, workout);
    adjustedWorkout.date = moment(workout.date).format("YYYY-MM-DD");
    adjustedWorkout.duration = moment.duration(workout.duration).format("h:mm:ss");
    if (adjustedWorkout.user_id === window.CURRENT_USERID) {
      var type = workout.id ? "PATCH" : "POST";
      return (
        <EditWorkoutDetail
          show={this.state.showModal}
          onHide={this.toggleModal}
          type={type}
          workout={adjustedWorkout} />
        );
    } else {
      return (
        <ViewWorkoutDetail
          show={this.state.showModal}
          onHide={this.toggleModal}
          workout={adjustedWorkout} />
      );
    }
  },
  render: function() {
    var workout = this.props.workout;
    return (
      <li onClick={this.toggleModal} className="feed-item">
        <table className="table">
          <tbody>
            <tr>
              <td className="feed-item-header"
                  colSpan="4">{this.renderHeader(workout)}</td>
            </tr>
            <tr>
              <td>{this.renderDate(workout)}</td>
              <td>{this.renderDistance(workout)}</td>
              <td>{this.renderDuration(workout)}</td>
              <td>{this.renderPace(workout)}</td>
            </tr>
          </tbody>
        </table>
        {this.workoutModal()}
      </li>
    );
  }
});

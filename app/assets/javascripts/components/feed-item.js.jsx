window.FeedItem = React.createClass({
  getInitialState: function() {
    return { showModal: false };
  },
  renderHeader: function(workout) {
    return (
      <div className="feed-item-header group">
        <div className="feed-item-username">
          <a href={"#/users/" + workout.user_id}>{workout.user_username}</a>
        </div>
        <div className="feed-item-date">
          <span>{moment(workout.date).format("dddd, M/D/YYYY")}</span>
        </div>
      </div>
    );
  },
  renderNotes: function(notes) {
    if (notes !== null ){
      return (
        <td className="feed-item-title">
          <img src="assets/glyphicons-40-notes2.png" className="glyphicon"/>
          <div>
            <span className="notes">{notes}</span>
          </div>
        </td>
      );
    }
  },
  renderActivity: function(workout) {
    var imageUrl = "assets/" + workout.activity + ".png";
    return (
      <td className="detail">
        <div className="detail-header">
          <img src={imageUrl} className="glyphicon"/>
        </div>
        <div className="detail-content">
          {workout.activity}
        </div>
      </td>
    );
  },
  renderDistance: function(workout) {
    if (workout.distance !== 0) {
      return (
        <td className="detail">
          <div className="detail-header">
            <img src="assets/glyphicons-27-road2.png" className="glyphicon"/>
          </div>
          <div className="detail-content">
            {workout.distance + " miles"}
          </div>
        </td>
      );
    }
  },
  renderDuration: function(workout) {
    var duration = moment.duration(workout.duration).format("h:mm:ss");
    if (duration !== "0") {
      return (
        <td className="detail">
          <div className="detail-header">
            <img src="assets/glyphicons-541-hourglass2.png" className="glyphicon"/>
          </div>
          <div className="detail-content">
            {duration}
          </div>
        </td>
      );
    }
  },
  renderPace: function(workout) {
    var distance = workout.distance,
        duration = moment.duration(workout.duration).format("h:mm:ss");
    if (distance !== 0 && duration !== "0") {
      return (
        <td className="detail">
          <div className="detail-header">
            <img src="assets/glyphicons-598-watch2.png" className="glyphicon"/>
          </div>
          <div className="detail-content">
            {moment.duration(moment.duration(workout.duration) / workout.distance)
              .format("h:mm:ss") + " min/mile"}
          </div>
        </td>
      );
    }
  },
  renderDefault: function(workout) {
    if (workout.distance === 0 &&
        moment.duration(workout.duration).format("h:mm:ss") === "0") {
      return (
        <td className="detail">
          <div className="detail-header">
            <img src="assets/glyphicons-195-circle-question-mark2.png" className="glyphicon"/>
            <span>No workout details logged</span>
          </div>
          <br/>
        </td>
      );
    }
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
        {this.renderHeader(workout)}
        <table className="feed-item-table title-notes-table">
          <tbody>
            <tr>
              <td className="feed-item-title">
                <img src="assets/glyphicons-88-log-book2.png" className="glyphicon"/>
                <div>
                  <span className="title">{workout.title}</span>
                </div>
              </td>
              {this.renderNotes(workout.notes)}
            </tr>
          </tbody>
        </table>
        <table className="feed-item-table">
          <tbody>
            <tr>
              {this.renderActivity(workout)}
              {this.renderDistance(workout)}
              {this.renderDuration(workout)}
              {this.renderPace(workout)}
              {this.renderDefault(workout)}
            </tr>
          </tbody>
        </table>
        {this.workoutModal()}
      </li>
    );
  }
});

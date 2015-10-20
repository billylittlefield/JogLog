window.FeedItem = React.createClass({
  renderHeader: function(workout) {
    return (
      <div>
        <b>{workout.user_username}</b>: {workout.title}
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
  render: function() {
    var workout = this.props.workout;
    return (
      <li className="feed-item">
        <table className="table">
          <tbody>
            <tr>
              <td colSpan="4">{this.renderHeader(workout)}</td>
            </tr>
            <tr>
              <td>{this.renderDate(workout)}</td>
              <td>{this.renderDistance(workout)}</td>
              <td>{this.renderDuration(workout)}</td>
              <td>{this.renderPace(workout)}</td>
            </tr>
          </tbody>
        </table>
      </li>
    );
  }
});

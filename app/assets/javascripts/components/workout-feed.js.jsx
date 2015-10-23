window.WorkoutFeed = React.createClass({
  getInitialState: function() {
    return { workouts: [] };
  },
  componentWillMount: function() {
    UserStore.addFeedChangeListener(this.updateFeed);
    this.updateFeed();
  },
  componentWillUnmount: function() {
    UserStore.removeFeedChangeListener(this.updateFeed);
  },
  updateFeed: function() {
    this.setState({ workouts: UserStore.feedWorkouts() });
  },
  renderFeedItems: function() {
    return _.map(this.state.workouts, function(workout) {
      return <FeedItem workout={workout} key={"feed-item-" + workout.id}/>;
    });
  },
  render: function() {
    return (
      <div className="feed-wrapper">
        <ul className="feed-list">
          {this.renderFeedItems()}
        </ul>
      </div>
    );
  }
});

window.WorkoutFeed = React.createClass({
  displayName: "WorkoutFeed",

  getInitialState: function () {
    return { workouts: [] };
  },
  componentWillMount: function () {
    UserStore.addFeedChangeListener(this.updateFeed);
    this.updateFeed();
  },
  componentWillUnmount: function () {
    UserStore.removeFeedChangeListener(this.updateFeed);
  },
  updateFeed: function () {
    this.setState({ workouts: UserStore.feedWorkouts() });
  },
  renderFeedItems: function () {
    return _.map(this.state.workouts, function (workout) {
      return React.createElement(FeedItem, { workout: workout, key: "feed-item-" + workout.id });
    });
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Activity Feed"
      ),
      React.createElement(
        "ul",
        { className: "feed-list" },
        this.renderFeedItems()
      )
    );
  }
});
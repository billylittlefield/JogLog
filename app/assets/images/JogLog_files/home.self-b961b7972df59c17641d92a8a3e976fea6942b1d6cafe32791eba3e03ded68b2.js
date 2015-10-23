window.Home = React.createClass({
  displayName: "Home",

  render: function () {
    return React.createElement(
      "div",
      { className: "home-container" },
      React.createElement(
        "div",
        { className: "workout-feed-container" },
        React.createElement(WorkoutFeed, null)
      ),
      React.createElement(
        "div",
        { className: "workout-form-container" },
        React.createElement(WorkoutForm, { type: "POST", workout: WorkoutConstants.BLANK_WORKOUT })
      ),
      React.createElement(
        "div",
        { className: "leaderboards-container" },
        React.createElement(Leaderboard, null)
      )
    );
  }
});
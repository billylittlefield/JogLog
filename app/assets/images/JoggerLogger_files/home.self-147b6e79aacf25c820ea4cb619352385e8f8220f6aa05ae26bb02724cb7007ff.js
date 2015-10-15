window.Home = React.createClass({
  displayName: "Home",

  render: function () {
    return React.createElement(
      "div",
      { className: "home-container" },
      React.createElement(
        "div",
        { className: "workout-feed" },
        React.createElement(
          "p",
          null,
          "WORKOUT FEED HERE"
        )
      ),
      React.createElement(
        "div",
        { className: "workout-form" },
        React.createElement(WorkoutForm, null)
      ),
      React.createElement(
        "div",
        { className: "leaderboards" },
        React.createElement(
          "p",
          null,
          "LEADERBOARDS HERE"
        )
      )
    );
  }
});
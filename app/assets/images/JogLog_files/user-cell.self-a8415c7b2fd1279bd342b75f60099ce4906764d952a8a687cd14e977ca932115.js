window.UserCell = React.createClass({
  displayName: "UserCell",

  render: function () {
    return React.createElement(
      "td",
      { className: "day user-cell" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "#/users/" + this.props.user.id },
          this.props.user.username
        )
      )
    );
  }
});
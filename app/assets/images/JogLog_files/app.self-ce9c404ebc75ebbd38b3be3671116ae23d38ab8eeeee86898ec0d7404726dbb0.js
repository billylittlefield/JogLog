window.App = React.createClass({
  displayName: "App",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(Navbar, null)
      ),
      this.props.children
    );
  }
});
window.DayHeaders = React.createClass({
  displayName: "DayHeaders",

  userHeader: function () {
    if (this.props.type === "team") {
      return React.createElement(
        "th",
        { className: "day-header-item teammates-header" },
        "Teammates"
      );
    }
  },
  render: function () {
    return React.createElement(
      "tr",
      { className: "week" },
      this.userHeader(),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Sunday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Monday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Tuesday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Wednesday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Thursday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Friday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item" },
        "Saturday"
      ),
      React.createElement(
        "th",
        { className: "day-header-item totals-header" },
        "Totals"
      )
    );
  }
});
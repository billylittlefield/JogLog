window.PersonalCalendar = React.createClass({
  displayName: "PersonalCalendar",

  render: function () {
    return React.createElement(
      "div",
      { className: "calendar-page-container" },
      React.createElement(PersonalCalendarGrid, null)
    );
  }
});
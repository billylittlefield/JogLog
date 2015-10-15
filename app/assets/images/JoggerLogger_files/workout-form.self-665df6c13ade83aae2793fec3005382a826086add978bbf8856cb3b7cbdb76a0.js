window.WorkoutForm = React.createClass({
  displayName: "WorkoutForm",

  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return {
      title: "",
      activity: "running",
      date: moment().format('YYYY-MM-DD'),
      distance: "0.00",
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },
  submitWorkoutForm: function (e) {
    e.preventDefault();
    ApiUtil.createWorkout(this.state);
  },
  updateHour: function () {
    this.setState({ hours: document.getElementById("form-hours").value });
  },
  updateMin: function () {
    this.setState({ minutes: document.getElementById("form-minutes").value });
  },
  updateSec: function () {
    this.setState({ seconds: document.getElementById("form-seconds").value });
  },
  render: function () {
    return React.createElement(
      "form",
      { onSubmit: this.submitWorkoutForm },
      React.createElement(
        "h1",
        { className: "form-header" },
        "New Workout"
      ),
      React.createElement(
        "label",
        { htmlFor: "workout_title" },
        "Title"
      ),
      React.createElement("input", { name: "workout_title",
        type: "text",
        valueLink: this.linkState("title") }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "workout_activity" },
        "Activity"
      ),
      React.createElement(
        "select",
        { name: "workout_activity", valueLink: this.linkState("activity") },
        React.createElement(
          "option",
          { value: "running" },
          "Running"
        ),
        React.createElement(
          "option",
          { value: "biking" },
          "Biking"
        ),
        React.createElement(
          "option",
          { value: "swimming" },
          "Swimming"
        ),
        React.createElement(
          "option",
          { value: "walking" },
          "Walking"
        ),
        React.createElement(
          "option",
          { value: "elliptical" },
          "Elliptical"
        ),
        React.createElement(
          "option",
          { value: "exercise_bike" },
          "Exercise Bike"
        ),
        React.createElement(
          "option",
          { value: "nordic_skiing" },
          "Nordic Skiing"
        ),
        React.createElement(
          "option",
          { value: "rowing" },
          "Rowing"
        ),
        React.createElement(
          "option",
          { value: "rollerblading" },
          "Rollerblading"
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "workout_date" },
        "Date"
      ),
      React.createElement("input", { name: "workout_date",
        type: "date",
        valueLink: this.linkState("date") }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "distance" },
        "Distance"
      ),
      React.createElement("input", { name: "workout_distance",
        type: "number",
        step: "0.01",
        valueLink: this.linkState("distance") }),
      React.createElement("br", null),
      React.createElement(
        "label",
        null,
        "Duration"
      ),
      React.createElement("input", { className: "form-input-time",
        id: "form-hours",
        type: "text",
        placeholder: "HH",
        onChange: this.updateHour }),
      ":",
      React.createElement("input", { className: "form-input-time",
        id: "form-minutes",
        type: "text",
        placeholder: "MM",
        onChange: this.updateMin }),
      ":",
      React.createElement("input", { className: "form-input-time",
        id: "form-seconds",
        type: "text",
        placeholder: "SS",
        onChange: this.updateSec }),
      React.createElement("br", null),
      React.createElement(
        "label",
        { htmlFor: "workout_notes" },
        "Notes"
      ),
      React.createElement("textarea", { name: "workout_notes",
        valueLink: this.linkState("notes"),
        placeholder: "Write any workout details here!" }),
      React.createElement("br", null),
      React.createElement("input", { type: "submit", value: "Log Workout" })
    );
  }
});
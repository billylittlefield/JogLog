window.WorkoutForm = React.createClass({
  displayName: "WorkoutForm",

  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function () {
    return this.props.workout;
  },
  submitWorkoutForm: function (e) {
    e.preventDefault();
    ApiUtil.createWorkout(this.state, this.props.type);
  },
  submitButton: function () {
    if (this.props.type === "PATCH" || this.props.type === "POST") {
      return React.createElement("input", { type: "submit",
        className: "workout-submit",
        value: "Submit" });
    } else {
      return;
    }
  },
  parseDuration: function () {
    var duration = $(".duration-input").val().split(":");
    var minutes = 0,
        seconds = 0,
        hours = 0;
    if (duration.length === 1 && duration[0].length > 0) {
      minutes = parseInt(duration[0]) % 60;
      hours = Math.floor(parseInt(duration[0]) / 60);
    } else if (duration.length === 2) {
      seconds = parseInt(duration[1]) % 60;
      minutes = parseInt(duration[0]) + Math.floor(parseInt(duration[1]) / 60);
      if (minutes > 59) {
        hours = Math.floor(parseInt(minutes) / 60);
        minutes = minutes % 60;
      }
    } else if (duration.length === 3) {
      seconds = parseInt(duration[2]) % 60;
      minutes = parseInt(duration[1]) + Math.floor(parseInt(duration[2]) / 60);
      hours = parseInt(duration[0]);
      if (minutes > 59) {
        hours += Math.floor(parseInt(minutes) / 60);
        minutes = minutes % 60;
      }
    }
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      this.setState({ duration: "0:00:00",
        humanizedDuration: "Invalid" });
    } else {
      this.setState({ duration: moment.duration({ seconds: seconds,
          minutes: minutes,
          hours: hours }).format("h:mm:ss", { trim: false }),
        humanizedDuration: hours + " hours, " + minutes + " minutes, " + seconds + " seconds" });
    }
  },
  colorTitle: function (e) {
    $(e.target.parentElement).css("color", "#71B764");
  },
  decolorTitle: function (e) {
    $(e.target.parentElement).css("color", "#fff");
  },
  updateActivityState: function (activity) {
    this.setState({ activity: activity });
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "form-wrapper" },
      React.createElement(
        "h1",
        null,
        "Log Workout"
      ),
      React.createElement("hr", null),
      React.createElement(
        "form",
        { className: "workout-form",
          "data-mode": this.props.mode,
          onSubmit: this.submitWorkoutForm },
        React.createElement(
          "div",
          { className: "full-input" },
          React.createElement(
            "label",
            { htmlFor: "workout-title" },
            "Workout Title"
          ),
          React.createElement("input", { onFocus: this.colorTitle, onBlur: this.decolorTitle,
            type: "text",
            className: "workout-input",
            id: "workout-title",
            valueLink: this.linkState("title") })
        ),
        React.createElement(
          "div",
          { className: "left-input" },
          React.createElement(
            "label",
            { htmlFor: "workout_date" },
            "Date"
          ),
          React.createElement("input", { onFocus: this.colorTitle, onBlur: this.decolorTitle,
            className: "workout-input",
            name: "workout_date",
            type: "date",
            valueLink: this.linkState("date") })
        ),
        React.createElement(
          "div",
          { className: "right-input" },
          React.createElement(
            "label",
            { htmlFor: "workout_activity" },
            "Activity"
          ),
          React.createElement(
            "div",
            { onClick: this.colorTitle },
            React.createElement(ActivitySelect, {
              bubbleState: this.updateActivityState })
          )
        ),
        React.createElement(
          "div",
          { className: "left-input" },
          React.createElement(
            "label",
            { htmlFor: "distance" },
            "Distance"
          ),
          React.createElement("input", { onFocus: this.colorTitle, onBlur: this.decolorTitle,
            className: "workout-input",
            name: "workout_distance",
            type: "number",
            min: "0",
            placeholder: "0.00",
            step: "0.01",
            valueLink: this.linkState("distance") })
        ),
        React.createElement(
          "div",
          { className: "right-input" },
          React.createElement(
            "label",
            { htmlFor: "duration" },
            "Duration"
          ),
          React.createElement("input", { onFocus: this.colorTitle, onBlur: this.decolorTitle,
            className: "workout-input duration-input",
            type: "text",
            placeholder: "0:00:00",
            onInput: this.parseDuration }),
          React.createElement(
            "span",
            { className: "duration-string" },
            this.state.humanizedDuration
          )
        ),
        React.createElement(
          "div",
          { className: "full-input" },
          React.createElement(
            "label",
            { htmlFor: "workout_notes" },
            "Notes"
          ),
          React.createElement("textarea", { onFocus: this.colorTitle, onBlur: this.decolorTitle,
            className: "workout-input workout-notes",
            name: "workout_notes",
            valueLink: this.linkState("notes"),
            placeholder: "Write any workout details here" })
        ),
        React.createElement("hr", { id: "bottom-hr" }),
        this.submitButton()
      )
    );
  }
});
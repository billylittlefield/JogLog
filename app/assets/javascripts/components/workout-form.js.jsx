window.WorkoutForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return this.props.workout;
  },
  submitWorkoutForm: function(e) {
    e.preventDefault();
    if (this.props.onHide) {
      this.props.onHide();
    }
    if (this.state.title === "") {
      $("#title-error, #workout-title").addClass("show-error");
    } else {
      $("#title-error, #workout-title").removeClass("show-error");
      ApiUtil.createWorkout(this.state, this.props.type);
    }
  },
  submitButton: function() {
    if (this.props.type === "PATCH") {
      return <input type="submit"
                    className="workout-submit"
                    value="Update"/>;
    } else if (this.props.type === "POST") {
      return <input type="submit"
                    className="workout-submit"
                    value="Submit"/>;
    } else {
      return;
    }
  },
  parseDuration: function() {
    var duration = $(".duration-input").val().split(":");
    var minutes = 0,
        seconds = 0,
        hours = 0;
    if (duration.length === 1 && duration[0].length > 0) {
      minutes = parseInt(duration[0]) % 60;
      hours = Math.floor(parseInt(duration[0]) / 60);
    } else if (duration.length === 2) {
      seconds = parseInt(duration[1]) % 60;
      minutes = parseInt(duration[0]) +
                Math.floor(parseInt(duration[1]) / 60);
      if (minutes > 59) {
        hours = Math.floor(parseInt(minutes) / 60);
        minutes = minutes % 60;
      }
    } else if (duration.length === 3) {
      seconds = parseInt(duration[2]) % 60;
      minutes = parseInt(duration[1]) +
                Math.floor(parseInt(duration[2]) / 60);
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
                                                  hours: hours })
                                      .format("h:mm:ss", { trim: false }),
                      humanizedDuration: hours+" hours, "+
                                         minutes+" minutes, "+
                                         seconds+" seconds"});
    }
  },
  colorTitle: function(e) {
    $(e.target.parentElement).css("color", "#71B764");
  },
  decolorTitle: function(e) {
    $(e.target.parentElement).css("color", "#333");
  },
  updateActivityState: function(activity) {
    this.setState({ activity: activity });
  },
  updateDistanceUnitState: function(unit) {
    this.setState({ distance_unit: unit });
  },
  activities: ["Running", "Biking", "Swimming", "Walking", "Hiking",
               "Treadmill", "Exercise Bike", "Elliptical",
               "Nordic Skiing", "Rowing", "Rollerblading"],
  distanceUnits: ["miles", "kilometers", "meters", "yards"],
  headerText: function() {
    if (this.props.type == "POST") {
      return "Log a Workout";
    } else if (this.props.type == "PATCH") {
      return "Edit Workout Details";
    }
  },
  render: function() {
    return (
      <div className="form-wrapper">
        <h1>{this.headerText()}</h1>
        <hr/>
        <form className="workout-form"
              data-mode={this.props.mode}
              onSubmit={this.submitWorkoutForm}>
          <div className="full-input input-group">
            <label htmlFor="workout-title">Workout Title</label>
            <span id="title-error">Please enter a title for your workout</span>
            <input onFocus={this.colorTitle} onBlur={this.decolorTitle}
                   type="text"
                   className="workout-input"
                   id="workout-title"
                   valueLink={this.linkState("title")}/>
          </div>
          <div className="left-input input-group">
            <label htmlFor="workout_date">Date</label>
            <input onFocus={this.colorTitle} onBlur={this.decolorTitle}
                   className="workout-input"
                   name="workout_date"
                   type="date"
                   valueLink={this.linkState("date")}/>
          </div>
          <div className="right-input input-group">
            <label htmlFor="workout_activity">Activity</label>
            <div tabIndex="0" className="activity-select-wrapper"
                 onFocus={this.colorTitle} onBlur={this.decolorTitle}>
              <CustomSelect id="workout-form-activity"
                            choices={this.activities}
                            default={this.state.activity}
                            bubbleState={this.updateActivityState}/>
            </div>
          </div>
          <div className="left-input input-group">
            <label id="distance-label" htmlFor="distance">Distance</label>
            <input onFocus={this.colorTitle} onBlur={this.decolorTitle}
                   className="workout-input distance-input"
                   name="workout_distance"
                   type="number"
                   min="0"
                   placeholder="0.00"
                   step="any"
                   valueLink={this.linkState("distance")}/>
            <div tabIndex="0" className="activity-select-wrapper"
                 onFocus={this.colorTitle} onBlur={this.decolorTitle}>
              <CustomSelect id="workout-form-distance-unit"
                            choices={this.distanceUnits}
                            default={this.state.distance_unit}
                            bubbleState={this.updateDistanceUnitState}/>
            </div>
          </div>
          <div className="right-input input-group group">
            <label htmlFor="duration">Duration</label>
            <input onFocus={this.colorTitle} onBlur={this.decolorTitle}
                   className="workout-input duration-input"
                   type="text"
                   placeholder="0:00:00"
                   defaultValue={this.props.workout.duration}
                   onInput={this.parseDuration}/>
            <div className="duration-string">
              {this.state.humanizedDuration}
            </div>
          </div>
          <div className="full-input input-group">
            <label htmlFor="workout_notes">Notes</label>
            <textarea onFocus={this.colorTitle} onBlur={this.decolorTitle}
                      className="workout-input workout-notes"
                      name="workout_notes"
                      valueLink={this.linkState("notes")}
                      placeholder="Write any workout details here"/>
          </div>
          {this.submitButton()}
          <hr/>
        </form>
      </div>
    );
  }
});

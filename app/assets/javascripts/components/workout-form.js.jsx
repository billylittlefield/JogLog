window.WorkoutForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return this.props.workout;
  },
  submitWorkoutForm: function(e) {
    e.preventDefault();
    ApiUtil.createWorkout(this.state, this.props.type);
  },
  submitButton: function() {
    if (this.props.type === "PATCH") {
      return <input type="submit"
                    className="btn btn-primary"
                    value="Update Workout"/>;
    } else if (this.props.type === "POST") {
      return <input type="submit"
                    className="btn btn-primary"
                    value="Create Workout"/>;
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
                      humanizedDuration: hours+"h, "+
                                         minutes+"m, "+
                                         seconds+"s"});
    }
  },
  render: function() {
    return (
      <div className="form-div">
        <form className="workout-form"
              data-mode={this.props.mode}
              onSubmit={this.submitWorkoutForm}>
          <div className="form-group">
            <label htmlFor="workout-title">Workout Title</label>
            <input type="text"
                   className="form-control"
                   id="workout-title"
                   valueLink={this.linkState("title")}/>
          </div>
          <div className="form-group left-input">
            <label htmlFor="workout_date">Date</label>
            <input className="form-control"
                   name="workout_date"
                   type="date"
                   valueLink={this.linkState("date")}/>
          </div>
          <div className="form-group right-input">
            <label htmlFor="workout_activity">Activity</label>
            <select className="form-control" name="workout_activity" valueLink={this.linkState("activity")}>
              <option value="Run">Run</option>
              <option value="Bike">Bike</option>
              <option value="Swim">Swim</option>
              <option value="Walk">Walk</option>
              <option value="Elliptical">Elliptical</option>
              <option value="Exercise Bike">Exercise Bike</option>
              <option value="Nordic Skiing">Nordic Skiing</option>
              <option value="Rowing">Rowing</option>
              <option value="Rowing">Hiking</option>
              <option value="Rollerblading">Rollerblading</option>
            </select>
          </div>
          <div className="form-group left-input">
            <label htmlFor="distance">Distance</label>
            <input className="form-control"
                   name="workout_distance"
                   type="number"
                   min="0"
                   step="0.01"
                   valueLink={this.linkState("distance")}/>
          </div>
          <div className="form-group right-input">
            <label htmlFor="duration">Duration</label>
            <span>{this.state.humanizedDuration}</span>
            <input className="form-control duration-input"
                   type="text"
                   onInput={this.parseDuration}/>
          </div>
          <div className="form-group">
            <label htmlFor="workout_notes">Notes</label>
            <textarea className="form-control"
                      name="workout_notes"
                      valueLink={this.linkState("notes")}
                      placeholder="Write any workout details here!"/>
          </div>
          {this.submitButton()}
        </form>
      </div>
    );
  }
});

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
                   step="0.01"
                   valueLink={this.linkState("distance")}/>
          </div>
          <div className="form-group right-input">
            <label htmlFor="duration">Duration</label>
            <input className="form-control"
                   type="text"
                   valueLink={this.linkState("duration")}/>
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

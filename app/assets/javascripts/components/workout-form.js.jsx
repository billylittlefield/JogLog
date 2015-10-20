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
      return <input type="submit" value="Update Workout"/>;
    } else if (this.props.type === "POST") {
      return <input type="submit" value="Create Workout"/>;
    } else {
      return;
    }
  },
  render: function() {
    return (
      <form data-mode={this.props.mode}
            onSubmit={this.submitWorkoutForm}>
        <h2 className="form-workout-title">Title: </h2>
        <input type="text" valueLink={this.linkState("title")}/>
        <br/>
        <label htmlFor="workout_activity">Activity</label>
        <select name="workout_activity" valueLink={this.linkState("activity")}>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Walk">Walk</option>
          <option value="Elliptical">Elliptical</option>
          <option value="Exercise Bike">Exercise Bike</option>
          <option value="Nordic Skiing">Nordic Skiing</option>
          <option value="Rowing">Rowing</option>
          <option value="Rollerblading">Rollerblading</option>
        </select>
        <br/>
        <label htmlFor="workout_date">Date</label>
        <input name="workout_date"
               type="date"
               valueLink={this.linkState("date")}/>
        <br/>
        <label htmlFor="distance">Distance</label>
        <input name="workout_distance"
               type="number"
               step="0.01"
               valueLink={this.linkState("distance")}/>
        <br/>
        <label>Duration</label>
        <input className="form-input-time"
               type="text"
               valueLink={this.linkState("duration")}/>
        <br/>
        <label htmlFor="workout_notes">Notes</label>
        <textarea name="workout_notes"
                  valueLink={this.linkState("notes")}
                  placeholder="Write any workout details here!"/>
        <br/>
        {this.submitButton()}
      </form>
    );
  }
});

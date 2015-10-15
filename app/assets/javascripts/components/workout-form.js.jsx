window.WorkoutForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
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
  submitWorkoutForm: function(e) {
    e.preventDefault();
    ApiUtil.createWorkout(this.state);
  },
  updateHour: function() {
    this.setState({ hours: document.getElementById("form-hours").value });
  },
  updateMin: function() {
    this.setState({ minutes: document.getElementById("form-minutes").value });
  },
  updateSec: function() {
    this.setState({ seconds: document.getElementById("form-seconds").value });
  },
  render: function() {
    return (
      <form onSubmit={this.submitWorkoutForm}>
        <h1 className="form-header">New Workout</h1>
        <label htmlFor="workout_title">Title</label>
        <input name="workout_title"
               type="text"
               valueLink={this.linkState("title")}/>
        <br/>
        <label htmlFor="workout_activity">Activity</label>
        <select name="workout_activity" valueLink={this.linkState("activity")}>
          <option value="Run">Running</option>
          <option value="Bike">Biking</option>
          <option value="Swim">Swimming</option>
          <option value="Walk">Walking</option>
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
               id="form-hours"
               type="text"
               placeholder="HH"
               onChange={this.updateHour}/>:
        <input className="form-input-time"
               id="form-minutes"
               type="text"
               placeholder="MM"
               onChange={this.updateMin}/>:
        <input className="form-input-time"
               id="form-seconds"
               type="text"
               placeholder="SS"
               onChange={this.updateSec}/>
        <br/>
        <label htmlFor="workout_notes">Notes</label>
        <textarea name="workout_notes"
                  valueLink={this.linkState("notes")}
                  placeholder="Write any workout details here!"/>
        <br/>
        <input type="submit" value="Log Workout"/>
      </form>
    );
  }
});

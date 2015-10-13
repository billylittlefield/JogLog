window.WorkoutForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      title: "",
      activity: "",
      date: moment().format('YYYY-MM-DD'),
      distance: "0.00",
      time: "00:00:00"
    };
  },
  submitWorkoutForm: function() {

  },
  render: function() {
    return (
      <form onSubmit={submitWorkoutForm}>
        <h1 className="form-header">New Workout</h1>
        <label htmlFor="workout_title">Title</label>
        <input name="workout_title"
               type="text"
               valueLink={this.linkState("title")}/>
        <br/>
        <label htmlFor="workout_activity">Activity</label>
        <select name="workout_activity" valueLink={this.linkState("activity")}>
          <option value="running">Run</option>
          <option value="biking">Bike</option>
          <option value="swimming">Swim</option>
          <option value="swimming">Walk</option>
          <option value="elliptical">Elliptical</option>
          <option value="elliptical">Exercise Bike</option>
          <option value="nordic">Nordic Skiing</option>
          <option value="rollerblading">Rowing</option>
          <option value="rollerblading">Rollerblading</option>
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
        <label htmlFor="workout_time">Time</label>
        <input name="workout_time"
               type="text"
               valueLink={this.linkState("time")}/>
        <br/>
        <input type="submit" value="Log Workout"/>
      </form>
    );
  }
});

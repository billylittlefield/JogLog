window.Day = React.createClass({
  getInitialState: function() {
    return { dayWorkouts: [],
             displayIdx: 0 };
  },
  componentWillMount: function() {
    WorkoutStore.AddCalendarChangeListener(this.fetchWorkouts);
  },
  componentWillUnmount: function() {
    WorkoutStore.removeCalendarChangeListener(this.fetchWorkouts);
  },
  fetchWorkouts: function() {
    this.setState({
      dayWorkouts: WorkoutStore.workoutsForDay(this.props.date)
    });
  },
  monthClass: function() {
    var klass = "day";
    if (this.props.displayMonth === this.props.date.month()) {
      klass += " current-month";
    } else {
      klass += " neighbor-month";
    }
    return klass;
  },
  prevWorkout: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ?
                          (this.state.dayWorkouts.length - 1) : (currentIdx - 1);
    this.setState({ displayIdx: newIdx });
  },
  nextWorkout: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === (this.state.dayWorkouts.length - 1) ?
                          0 : (currentIdx + 1);
    this.setState({ displayIdx: newIdx });
  },
  multiWorkoutHeader: function() {
    if (this.state.dayWorkouts.length > 1) {
      return (
        <div className="multi-workout-header">
          <span className="day-number"><b>{this.props.date.date()}</b></span>
          <span className="workout-toggle">
            <span onClick={this.prevWorkout}>&#9664;</span>
             <span>
              {" " + (this.state.displayIdx + 1) + " of " +
                      this.state.dayWorkouts.length + " "}
             </span>
             <span onClick={this.nextWorkout}>&#9654;</span>
           </span>
        </div>
     );
   } else {
     return (
       <span className="day-number"><b>{this.props.date.date()}</b></span>
     );
   }
  },
  workoutItemDistance: function(displayWorkout) {
    if (displayWorkout.distance !== 0) {
      return (<span>
                <br/>
                {displayWorkout.activity + ": " +
                 displayWorkout.distance + " miles"}
              </span>);
    }
  },
  workoutItemTime: function(displayWorkout) {
    if (displayWorkout.duration.substring(11,19) !== "00:00:00") {
      return (<span>
                <br/>
                {displayWorkout.activity + " time: " +
                 displayWorkout.duration.stylizeDuration()}
              </span>);
    }
  },
  workoutItem: function() {
    if (this.state.dayWorkouts.length > 0) {
      var displayWorkout = this.state.dayWorkouts[this.state.displayIdx];
      return (
        <div className="workout-item">
          <span><b>{displayWorkout.title}</b></span>
          {this.workoutItemDistance(displayWorkout)}
          {this.workoutItemTime(displayWorkout)}
        </div>
      );
    }
  },
  render: function() {
    return (
      <td className={this.monthClass()}>
        {this.multiWorkoutHeader()}
        {this.workoutItem()}
      </td>
    );
  }
});

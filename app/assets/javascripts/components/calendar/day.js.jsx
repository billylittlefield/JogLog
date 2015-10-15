window.Day = React.createClass({
  getInitialState: function() {
    return { workouts: [],
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
      workouts: WorkoutStore.retrieveWorkoutsForDate(this.props.date)
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
                          (this.state.workouts.length - 1) : (currentIdx - 1);
    this.setState({ displayIdx: newIdx });
  },
  nextWorkout: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === (this.state.workouts.length - 1) ?
                          0 : (currentIdx + 1);
    this.setState({ displayIdx: newIdx });
  },
  multiWorkoutHeader: function() {
    if (this.state.workouts.length > 1) {
      return (
        <div className="multi-workout-header">
          <span className="day-number">{this.props.date.date()}</span>
          <span onClick={this.prevWorkout}>Prev</span>
           <span>
            {"(" + (this.state.displayIdx + 1) + " of " +
                    this.state.workouts.length + ")" }
           </span>
           <span onClick={this.nextWorkout}>Next</span>
        </div>
     );
   } else {
     return (
       <div className="multiWorkoutHeader">
         <span className="day-number">{this.props.date.date()}</span>
       </div>
     );
   }
  },
  workoutItemDistance: function(activeWorkout) {
    if (activeWorkout.distance !== 0) {
      return (<span><br/><b>Miles: </b>{activeWorkout.distance}</span>);
    }
  },
  workoutItemTime: function(activeWorkout) {
    if (activeWorkout.duration.substring(11,19) !== "00:00:00") {
      return (<span>
                <br/>
                <b>Time: </b>{activeWorkout.duration.stylizeDuration()}
              </span>);
    }
  },
  workoutItem: function() {
    if (this.state.workouts.length > 0) {
      var activeWorkout = this.state.workouts[this.state.displayIdx];
      return (
        <div className="workout-item">
          <span><b>{activeWorkout.title}</b></span>
          <br/>
          <span><b>Activity: </b>{activeWorkout.activity}</span>
          {this.workoutItemTime(activeWorkout)}
          {this.workoutItemDistance(activeWorkout)}
        </div>
      );
    }
  },
  openDetailModal: function() {
    console.log("what?");
    React.render(<WorkoutDetail/>, document.getElementById("modal-hook"));
  },
  render: function() {
    return (
      <div onClick={this.openDetailModal} className={this.monthClass()}>
        {this.multiWorkoutHeader()}
        {this.workoutItem()}
      </div>
    );
  }
});

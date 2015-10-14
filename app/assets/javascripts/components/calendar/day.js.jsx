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
        <div className="multiWorkoutHeader">
          <span onClick={this.prevWorkout}>Prev</span>
           <span>
            {"(" + (this.state.displayIdx + 1) + " of " +
                    this.state.workouts.length + ")" }
           </span>
           <span onClick={this.nextWorkout}>Next</span>
        </div>
     );
    }
  },
  render: function() {
    return (
      <div className={this.monthClass()}>
        <span className="day-number">{this.props.date.date()}</span>
        {this.multiWorkoutHeader()}
      </div>
    );
  }
});

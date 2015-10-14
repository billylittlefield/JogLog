window.Day = React.createClass({
  getInitialState: function() {
    return { workouts: [] }
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
  render: function() {
    return (
      <div className={this.monthClass()}>
        {this.state.workouts}
        {this.props.date.format("MM-DD-YYYY")}
      </div>
    );
  }
});

window.WeekTotals = React.createClass({
  getInitialState: function() {
    return {
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart),
      displayIdx: 0
    };
  },
  sortedTotals: function() {
    var sortedTotals = {};
    this.state.weekWorkouts.forEach(function(workout) {
      var activity = workout.activity;
      if (sortedTotals[activity]) {
        sortedTotals[activity].duration.add(moment.duration(workout.duration));
        sortedTotals[activity].distance += workout.distance;
      } else {
        sortedTotals[activity] = {
          duration: moment.duration(workout.duration),
          distance: workout.distance
        };
      }
    });
    return sortedTotals;
  },
  componentWillMount: function() {
    WorkoutStore.AddCalendarChangeListener(this.updateWeekTotals);
  },
  componentWillUnmount: function() {
    WorkoutStore.removeCalendarChangeListener(this.updateWeekTotals);
  },
  updateWeekTotals: function() {
    this.setState({
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart),
    });
  },
  prevActivity: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ?
                      (_.keys(this.sortedTotals).length - 1) : (currentIdx - 1);
    this.setState({ displayIdx: newIdx });
  },
  nextActivity: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === (_.keys(this.sortedTotals).length - 1) ?
                      0 : (currentIdx + 1);
    this.setState({ displayIdx: newIdx });
  },
  multiActivityHeader: function() {
    var allTotals = this.sortedTotals();
    if (_.keys(allTotals).length > 1) {
      return (
        <div className="multi-workout-header">
          <span className="workout-toggle">
            <span onClick={this.prevActivity}>&#9664;</span>
            <span><b>
              {" " + _.keys(allTotals)[this.state.displayIdx] + " "}
            </b></span>
            <span onClick={this.nextActivity}>&#9654;</span>
          </span>
        </div>
      );
    } else {
      return (
        <div className="multi-workout-header">
          <b>{_.keys(this.sortedTotals())[0]}</b>
        </div>
      );
    }
  },
  distanceTotal: function(distanceTotal) {
    if (distanceTotal !== 0) {
      return (<span><br/>{"Distance: " + distanceTotal}</span>);
    }
  },
  durationTotal: function(durationTotal) {
    if (durationTotal !== "0") {
      return (<span><br/>{"Time: " + durationTotal}</span>);
    }
  },
  activityTotals: function() {
    var allTotals = this.sortedTotals();
    if (!_.isEmpty(allTotals)) {
      var displayActivity = _.keys(allTotals)[this.state.displayIdx];
      return (
        <div className="workout-item">
          {this.distanceTotal(allTotals[displayActivity].distance)}
          {this.durationTotal(allTotals[displayActivity].duration.format("h:mm:ss"))}
        </div>
      );
    }
  },
  render: function() {
    return (
      <td className="day week-totals">
        {this.multiActivityHeader()}
        {this.activityTotals()}
      </td>
    );
  }
});

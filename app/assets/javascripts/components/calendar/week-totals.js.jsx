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
          duration: moment.duration(workout.duration.substring(11,19)),
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
  multiActivityHeader: function() {
    var allTotals = this.sortedTotals();
    if (_.keys(allTotals).length > 1) {
      return (
        <div className="multi-workout-header">
          <span className="workout-toggle">
            <span onClick={this.prevActivity}>&#9664;</span>
            <span>
              {" " + allTotals[_.keys(allTotals)[this.state.displayIdx]] + " "}
            </span>
            <span onClick={this.nextActivity}>&#9654;</span>
          </span>
        </div>
      );
    }
  },
  activityTotals: function() {
    var allTotals = this.sortedTotals();
    if (!_.isEmpty(allTotals)) {
      var displayActivity = _.keys(allTotals)[this.state.displayIdx];
      return (
        <div className="workout-item">
          <span><b>{displayActivity}</b></span>
          {"Total distance: " + allTotals[displayActivity].distance}
          {"Total time: " + allTotals[displayActivity].duration.format("h:mm:ss")}
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

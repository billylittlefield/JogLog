window.WeekTotals = React.createClass({
  getInitialState: function() {
    return {
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart,
                                                 this.props.userId),
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
    WorkoutStore.addCalendarChangeListener(this.updateWeekTotals);
  },
  componentWillUnmount: function() {
    WorkoutStore.removeCalendarChangeListener(this.updateWeekTotals);
  },
  updateWeekTotals: function() {
    this.setState({
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart,
                                                 this.props.userId),
    });
  },
  prevActivity: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === 0 ?
                      (_.keys(this.sortedTotals()).length - 1) : (currentIdx - 1);
    this.setState({ displayIdx: newIdx });
  },
  nextActivity: function() {
    var currentIdx = this.state.displayIdx;
    var newIdx = currentIdx === (_.keys(this.sortedTotals()).length - 1) ?
                      0 : (currentIdx + 1);
    this.setState({ displayIdx: newIdx });
  },
  activityHeader: function() {
    var activity = _.keys(this.sortedTotals())[this.state.displayIdx];
    if (activity === "Rollerblading") {
      activity = "Blading";
    } else if (activity === "Nordic Skiing") {
      activity = "Nordic";
    } else if (activity === "Exercise Bike") {
      activity = "Ex. Bike";
    }
    return activity;
  },
  multiActivityHeader: function() {
    var allTotals = this.sortedTotals();
    if (_.keys(allTotals).length > 1) {
      return (
        <div className="multi-workout-header">
          <div className="workout-toggle week-totals">
            <span className="arrow totals-arrow-left"
                  onClick={this.prevActivity}>&#9664;</span>
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {this.activityHeader()}
              &nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span className="arrow totals-arrow-right"
                  onClick={this.nextActivity}>&#9654;</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="multi-workout-header">
          <div className="workout-toggle week-totals">
            <span>
              {this.activityHeader()}
            </span>
          </div>
        </div>
      );
    }
  },
  distanceTotal: function(distanceTotal) {
    if (distanceTotal !== 0) {
      return (<div>{distanceTotal + " miles"}</div>);
    }
  },
  durationTotal: function(durationTotal) {
    if (durationTotal !== "0") {
      return (<div>{"Time: " + durationTotal}</div>);
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
      <td className="no-selection day week-totals">
        {this.multiActivityHeader()}
        {this.activityTotals()}
      </td>
    );
  }
});

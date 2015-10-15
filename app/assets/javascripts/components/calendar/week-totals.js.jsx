window.WeekTotals = React.createClass({
  getInitialState: function() {
    return {
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart)
    };
  },
  componentWillMount: function() {
    WorkoutStore.AddCalendarChangeListener(this.updateWeekTotals);
  },
  componentWillUnmount: function() {
    WorkoutStore.removeCalendarChangeListener(this.updateWeekTotals);
  },
  updateWeekTotals: function() {
    this.setState({
      weekWorkouts: WorkoutStore.workoutsForWeek(this.props.weekStart)
    });
  },
  render: function() {
    return (
      <td className="day week-totals">
        {this.state.weekWorkouts.map(function(workout){
          return <p>{workout.title}</p>;
        })}
      </td>
    );
  }
});

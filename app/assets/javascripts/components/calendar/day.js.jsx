window.Day = React.createClass({
  getInitialState: function() {
    return { dayWorkouts: WorkoutStore.workoutsForDay(this.props.date,
                                                      this.props.userId),
             displayIdx: 0,
             showModal: false };
  },
  componentWillMount: function() {
    WorkoutStore.addCalendarChangeListener(this.fetchWorkouts);
  },
  componentWillUnmount: function() {
    WorkoutStore.removeCalendarChangeListener(this.fetchWorkouts);
  },
  fetchWorkouts: function() {
    this.setState({
      dayWorkouts: WorkoutStore.workoutsForDay(this.props.date,
                                               this.props.userId)
    });
  },
  monthClass: function() {
    var klass = "day no-selection";
    if (this.props.type === "personal" &&
        this.props.displayMonth !== this.props.date.month()) {
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
        <div className="multi-workout-header group">
          <span className="day-number"><b>{this.props.date.date()}</b></span>
          <div className="workout-toggle">
            <span className="arrow" onClick={this.prevWorkout}>&#9664;</span>
             <span>
              &nbsp;&nbsp;
              {(this.state.displayIdx + 1) + " of " +
                      this.state.dayWorkouts.length}
              &nbsp;&nbsp;
             </span>
             <span className="arrow" onClick={this.nextWorkout}>&#9654;</span>
           </div>
        </div>
     );
   } else {
     return (
       <div>
         <span className="day-number"><b>{this.props.date.date()}</b></span>
       </div>
     );
   }
  },
  workoutItemDistance: function(displayWorkout) {
    if (displayWorkout.distance !== 0) {
      return (<div>
                {displayWorkout.activity + ": " +
                 displayWorkout.distance + " miles"}
              </div>);
    }
  },
  workoutItemTime: function(displayWorkout) {
    if (displayWorkout.duration &&
        displayWorkout.duration.substring(11,19) !== "00:00:00") {
      return (<div>
                {"Time: " +
                 moment.duration(displayWorkout.duration).format("h:mm:ss")}
              </div>);
    }
  },
  workoutItem: function() {
    if (this.state.dayWorkouts.length > 0) {
      var displayWorkout = this.state.dayWorkouts[this.state.displayIdx];
      return (
        <div onClick={this.toggleModal} className="workout-item">
          <div className="workout-title">{displayWorkout.title}</div>
          {this.workoutItemDistance(displayWorkout)}
          {this.workoutItemTime(displayWorkout)}
        </div>
      );
    } else {
      return <div onClick={this.toggleModal} className="workout-item"/>;
    }
  },
  toggleModal: function() {
    var workout = this.state.dayWorkouts[this.state.displayIdx];
    if (workout) {
      ApiUtil.getCommentsForWorkout(workout.id);
    }
    if (this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  },
  workoutModal: function() {
    var workout = this.state.dayWorkouts[this.state.displayIdx] ||
                  WorkoutConstants.BLANK_WORKOUT;
    var adjustedWorkout = $.extend(true, {}, workout);
    adjustedWorkout.date = this.props.date.format("YYYY-MM-DD");
    if (adjustedWorkout.duration !== "0:00:00") {
      adjustedWorkout.duration = moment.duration(workout.duration).format("h:mm:ss");
    }
    if (this.props.userId === window.CURRENT_USERID) {
      var type = workout.id ? "PATCH" : "POST";
      return (
        <EditWorkoutDetail
          show={this.state.showModal}
          onHide={this.toggleModal}
          type={type}
          workout={adjustedWorkout} />
        );
    } else {
      if (workout.id) {
        return (
          <ViewWorkoutDetail
            userName={this.props.userName}
            show={this.state.showModal}
            onHide={this.toggleModal}
            workout={adjustedWorkout} />
        );
      }
    }
  },
  dayClass: function() {
    var klass = "day-details";
    if (this.state.dayWorkouts[this.state.displayIdx]) {
      klass += " day-container";
    }
    return klass;
  },
  render: function() {
    return (
      <td className={this.monthClass()}>
        {this.multiWorkoutHeader()}
        <div className={this.dayClass()}>
          {this.workoutItem()}
          {this.workoutModal()}
        </div>
      </td>
    );
  }
});

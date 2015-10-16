window.ApiActions = {
  receiveWorkout: function(workout) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUT_RECEIVED,
      workout: workout
    });
    window.location = "#/calendar";
  },
  receivePersonalWorkouts: function(workouts) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.PERSONAL_WORKOUTS_RECEIVED,
      workouts: workouts
    });
  },
  receiveTeamWorkouts: function(workoutsForTeam) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.TEAM_WORKOUTS_RECEIVED,
      workoutsForTeam: workoutsForTeam
    });
  }
};

window.ApiActions = {
  receiveWorkout: function(workout) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUT_RECEIVED,
      workout: workout
    });
    window.location = "/calendar";
  },
  receiveFilteredWorkouts: function(workouts) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.FILTERED_WORKOUTS_RECEIVED,
      workouts: workouts
    });
  }
};

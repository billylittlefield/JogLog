window.ApiActions = {
  receiveWorkout: function (workout) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUT_RECEIVED,
      workout: workout
    });
    window.location = "/calendar";
  }
};

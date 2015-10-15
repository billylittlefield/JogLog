window.ApiUtil = {
  createWorkout: function(workout) {
    workout.duration = parseTime(workout.hours,workout.minutes,workout.seconds);
    $.ajax({
      url: "api/workouts",
      method: "POST",
      data: { workout: workout },
      success: function(workout) {
        ApiActions.receiveWorkout(workout);
      }
    });
  },
  getMonthsWorkoutsByUser: function(month, year, user_id) {
    $.ajax({
      url: "api/workouts",
      method: "GET",
      data: { month: month, user_id: user_id, year: year },
      success: function(workouts) {
        ApiActions.receiveFilteredWorkouts(workouts);
      }
    });
  }
};

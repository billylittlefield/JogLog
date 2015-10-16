window.ApiUtil = {
  createWorkout: function(workout) {
    workout.duration = parseTime(workout.hours,workout.minutes,workout.seconds);
    $.ajax({
      url: "api/workouts",
      method: "POST",
      dataType: "json",
      data: { workout: workout },
      success: function(workout) {
        ApiActions.receiveWorkout(workout);
      }
    });
  },
  getMonthsWorkoutsByUser: function(userId, month, year) {
    $.ajax({
      url: "api/workouts",
      method: "GET",
      dataType: "json",
      data: { month: month, user_id: userId, year: year },
      success: function(workouts) {
        ApiActions.receivePersonalWorkouts(workouts);
      }
    });
  },
  getWeeksWorkoutsByTeam: function(teamId, weekStart) {
    $.ajax({
      url: "api/teams/" + teamId,
      type: "GET",
      data: { week_start: weekStart },
      dataType: "json",
      success: function(workoutsForTeam){
        ApiActions.receiveTeamWorkouts(workoutsForTeam);
      }
    });
  },
  getTeamsForUser: function(userId) {
    $.ajax({
      url: "api/users/" + userId,
      type: "GET",
      dataType: "json",
      success: function(userData){
        ApiActions.receiveUserData(userData);
      }
    });
  }
};

window.ApiUtil = {
  mixins: [ReactRouter.History],
  createWorkout: function(workout) {
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
  createTeam: function(team) {
    $.ajax({
      url: "api/teams",
      method: "POST",
      dataType: "json",
      data: { team: team },
      success: function(team) {
        ApiUtil.toggleMembership(team.id, "POST");
        window.location = "#/teams/" + team.id;
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
  getTeamWorkouts: function(teamId, weekStart) {
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
  },
  toggleMembership: function(teamId, type, successCallback) {
    $.ajax({
      url: "api/teams/" + teamId + "/membership",
      type: type,
      dataType: "json",
      data: { team_id: teamId },
      success: function() {
        successCallback();
        ApiUtil.getTeamsForUser(window.CURRENT_USERID);
      }
    });
  }
};

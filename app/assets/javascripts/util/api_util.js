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
        window.location = "#/teams/" + team.id;
        ApiUtil.toggleMembership(team.id, "POST", ApiUtil.getUserData);
      }
    });
  },
  getMonthsWorkoutsByUser: function(userId, month, year) {
    $.ajax({
      url: "api/workouts",
      method: "GET",
      dataType: "json",
      data: { month: month, user_id: userId, year: year },
      success: function(workoutsData) {
        ApiActions.receivePersonalWorkouts(workoutsData);
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
  getUserData: function(userId) {
    userId = userId || window.CURRENT_USERID;
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
        ApiUtil.getUserData(window.CURRENT_USERID);
      }
    });
  },
  toggleFollow: function(followeeId, type) {
    $.ajax({
      url: "api/users/" + followeeId + "/follow",
      type: type,
      dataType: "json",
      data: { followee_id: followeeId },
      success: function() {
        ApiUtil.getUserData(window.CURRENT_USERID);
      }
    });
  }
};

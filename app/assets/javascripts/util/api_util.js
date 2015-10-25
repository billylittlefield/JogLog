window.ApiUtil = {
  mixins: [ReactRouter.History],
  createWorkout: function(workout, type) {
    var urlSuffix = type === "PATCH" ? "/" + workout.id : "";
    $.ajax({
      url: "api/workouts" + urlSuffix,
      type: type,
      dataType: "json",
      data: { workout: workout },
      success: function(workout) {
        ApiUtil.getUserData();
        ApiActions.receiveWorkout(workout);
      }
    });
  },
  createTeam: function(team) {
    $.ajax({
      url: "api/teams",
      type: "POST",
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
      type: "GET",
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
  },
  getSearchData: function(queryText) {
    $.ajax({
      url: "api/users/search",
      type: "GET",
      data: {query: queryText},
      dataType: "json",
      success: function (resultsList) {
        ApiActions.receiveUserSearchResults(resultsList);
      }
    });
    $.ajax({
      url: "api/teams/search",
      type: "GET",
      data: {query: queryText},
      dataType: "json",
      success: function (resultsList) {
        ApiActions.receiveTeamSearchResults(resultsList);
      }
    });
  },
  getCommentsForWorkout: function(workoutId) {
    $.ajax({
      url: "api/workouts/" + workoutId + "/comments",
      type: "GET",
      dataType: "json",
      success: function(comments) {
        ApiActions.receiveCommentsForWorkout(workoutId, comments.comments);
      }
    });
  },
  createComment: function(comment) {
    $.ajax({
      url: "api/workouts/" + comment.workout_id + "/comments",
      type: "POST",
      data: { comment: comment },
      dataType: "json",
      success: function(comment) {
        ApiActions.receiveNewComment(comment);
      }
    });
  },
  getLeaderboards: function() {
    $.ajax({
      url: "api/workouts/leaderboard",
      type: "GET",
      dataType: "json",
      success: function (leaderboardData) {
        ApiActions.receiveLeaderboardData(leaderboardData);
      }
    });
  }
};

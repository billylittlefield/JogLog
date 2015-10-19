window.ApiActions = {
  receiveWorkout: function(workout) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUT_RECEIVED,
      workout: workout
    });
    window.location = "#/calendar";
  },
  receivePersonalWorkouts: function(workoutsData) {
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUTS_RECEIVED,
      workouts: workoutsData.workouts
    });
    AppDispatcher.dispatch({
      actionType: CalendarConstants.USERNAME_RECIEVED,
      username: workoutsData.username
    });
  },
  receiveTeamWorkouts: function(workoutsForTeam) {
    var teamName = workoutsForTeam.name;
    var workouts = [];
    var teamMembers = [];
    _.each(workoutsForTeam.members, function(member) {
      workouts = workouts.concat(member.workouts);
      teamMembers.push({ id: member.id, username: member.username });
    });
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUTS_RECEIVED,
      workouts: workouts
    });
    AppDispatcher.dispatch({
      actionType: TeamConstants.TEAM_MEMBERS_RECEIVED,
      teamMembers: teamMembers,
      teamName: teamName
    });
  },
  receiveUserData: function(userData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.TEAMS_RECEIVED,
      teams: userData.teams
    });
    AppDispatcher.dispatch({
      actionType: UserConstants.FOLLOWEES_RECEIVED,
      followees: userData.followees
    });
  },
  receiveSearchResults: function(resultsList) {
    AppDispatcher.dispatch({
      actionType: UserConstants.SEARCH_RESULTS_RECEIVED,
      resultsList: resultsList
    });
  }
};

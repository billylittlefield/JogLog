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
    workouts = [];
    teamMembers = [];
    _.each(workoutsForTeam.members, function(member) {
      workouts = workouts.concat(member.workouts);
      teamMembers.push({ id: member.id, username: member.username });
    });
    AppDispatcher.dispatch({
      actionType: WorkoutConstants.WORKOUTS_RECEIVED,
      workouts: workouts
    });
    AppDispatcher.dispatch({
      actionType: TeamConstants.TEAM_MEMBRS_RECEIVED,
      teamMembers: teamMembers
    });
  },
  receiveUserData: function(userData) {
    AppDispatcher.dispatch({
      actionType: UserConstants.TEAMS_RECEIVED,
      teams: userData.teams
    });
  }
};

(function(root) {
  'use strict';
  var _teams = [];
  var _followees = [];
  var _userSearchResults = [];
  var _teamSearchResults = [];
  var _allSearchResults = [];
  var _feedWorkouts = [];
  var TEAMS_UPDATED = "TEAMS_UPDATED";
  var FOLLOWEES_UPDATED = "FOLLOWEES_UPDATED";
  var SEARCH_RESULTS_UPDATED = "SEARCH_RESULTS_UPDATED";
  var FEED_WORKOUTS_UPDATED = "FEED_WORKOUTS_UPDATED";

  var updateTeams = function(teams) {
    _teams = teams;
    UserStore.emit(TEAMS_UPDATED);
  };

  var updateFollowees = function(followees) {
    _followees = followees;
    UserStore.emit(FOLLOWEES_UPDATED);
  };

  var updateFeedWorkouts = function(workouts) {
    _feedWorkouts = workouts;
    UserStore.emit(FEED_WORKOUTS_UPDATED);
  };

  var updateUserSearchResults = function(resultsList) {
    _userSearchResults = resultsList;
    UserStore.emit(SEARCH_RESULTS_UPDATED);
  };

  var updateTeamSearchResults = function(resultsList) {
    _teamSearchResults = resultsList;
    UserStore.emit(SEARCH_RESULTS_UPDATED);
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    isMember: function(teamId) {
      return _.some(_teams, function(team) { return team.id === teamId; });
    },
    isFollowing: function(userId) {
      return _.some(_followees, function(followee) { return followee.id === userId; });
    },
    teams: function() {
      return _teams.slice();
    },
    followees: function() {
      return _followees.slice();
    },
    userSearchResults: function() {
      return _userSearchResults.slice();
    },
    teamSearchResults: function() {
      return _teamSearchResults.slice();
    },
    feedWorkouts: function() {
      return _feedWorkouts.slice();
    },
    addUserTeamsChangeEventListener: function(callback) {
      this.on(TEAMS_UPDATED, callback);
    },
    removeUserTeamsChangeEventListener: function(callback) {
      this.removeListener(TEAMS_UPDATED, callback);
    },
    addFolloweesChangeEventListener: function(callback) {
      this.on(FOLLOWEES_UPDATED, callback);
    },
    removeFolloweesChangeEventListener: function(callback) {
      this.removeListener(FOLLOWEES_UPDATED, callback);
    },
    addSearchResultsChangeListener: function(callback) {
      this.on(SEARCH_RESULTS_UPDATED, callback);
    },
    removeSearchResultsChangeListener: function(callback) {
      this.removeListener(SEARCH_RESULTS_UPDATED, callback);
    },
    addFeedChangeListener: function(callback) {
      this.on(FEED_WORKOUTS_UPDATED, callback);
    },
    removeFeedChangeListener: function(callback) {
      this.removeListener(FEED_WORKOUTS_UPDATED, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.TEAMS_RECEIVED:
          updateTeams(payload.teams);
          break;
        case UserConstants.FOLLOWEES_RECEIVED:
          updateFollowees(payload.followees);
          break;
        case UserConstants.USER_SEARCH_RESULTS_RECEIVED:
          updateUserSearchResults(payload.userResultsList);
          break;
        case UserConstants.TEAM_SEARCH_RESULTS_RECEIVED:
          updateTeamSearchResults(payload.teamResultsList);
          break;
        case UserConstants.WORKOUT_FEED_RECEIVED:
          updateFeedWorkouts(payload.feedWorkouts);
          break;
      }
    })
  });

}(this));

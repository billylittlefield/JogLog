(function(root) {
  'use strict';
  var _teams = [];
  var _followees = [];
  var TEAMS_UPDATED = "TEAMS_UPDATED";
  var FOLLOWEES_UPDATED = "FOLLOWEES_UPDATED";

  var updateTeams = function(teams) {
    _teams = teams;
    UserStore.emit(TEAMS_UPDATED);
  };

  var updateFollowees = function(followees) {
    _followees = followees;
    UserStore.emit(FOLLOWEES_UPDATED);
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
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.TEAMS_RECEIVED:
          updateTeams(payload.teams);
          break;
        case UserConstants.FOLLOWEES_RECEIVED:
          updateFollowees(payload.followees);
          break;
      }
    })
  });

}(this));

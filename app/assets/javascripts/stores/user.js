(function(root) {
  'use strict';
  var _teams = [];
  var TEAMS_UPDATED = "TEAMS_UPDATED";

  var updateTeams = function(teams) {
    _teams = teams;
    UserStore.emit(TEAMS_UPDATED);
  };

  root.UserStore = $.extend({}, EventEmitter.prototype, {
    isMember: function(teamId) {
      return _.some(_teams, function(team) { return team.id === teamId; });
    },
    teams: function() {
      return _teams.slice();
    },
    addUserTeamsChangeEventListener: function(callback) {
      this.on(TEAMS_UPDATED, callback);
    },
    removeUserTeamsChangeEventListener: function(callback) {
      this.removeListener(TEAMS_UPDATED, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case UserConstants.TEAMS_RECEIVED:
          updateTeams(payload.teams);
          break;
      }
    })
  });

}(this));

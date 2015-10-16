(function(root) {
  'use strict';

  var _teamMembers = [];
  var TEAM_MEMBERS_CHANGED = "TEAM_MEMBERS_CHANGED";

  var resetTeamMembers = function(teamMembers) {
    _teamMembers = teamMembers;
    TeamStore.emit(TEAM_MEMBERS_CHANGED);
  };

  root.TeamStore = $.extend({}, EventEmitter.prototype, {
    teamMembers: function() {
      return _teamMembers.slice();
    },
    addTeamMemberChangeListener: function(callback) {
      this.on(TEAM_MEMBERS_CHANGED, callback);
    },
    removeTeamMemberChangeListener: function(callback) {
      this.removeListener(TEAM_MEMBERS_CHANGED, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TeamConstants.TEAM_MEMBRS_RECEIVED:
          resetTeamMembers(payload.teamMembers);
          break;
      }
    })
  });

}(this));

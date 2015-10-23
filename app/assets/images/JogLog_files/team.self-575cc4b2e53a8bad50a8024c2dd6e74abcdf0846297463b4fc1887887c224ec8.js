(function(root) {
  'use strict';

  var _teamMembers = [];
  var _teamName = "";
  var TEAM_MEMBERS_CHANGED = "TEAM_MEMBERS_CHANGED";

  var resetTeam = function(teamMembers, teamName) {
    _teamMembers = teamMembers;
    _teamName = teamName;
    TeamStore.emit(TEAM_MEMBERS_CHANGED);
  };

  root.TeamStore = $.extend({}, EventEmitter.prototype, {
    teamMembers: function() {
      return _teamMembers.slice();
    },
    teamName: function() {
      return _teamName.slice();
    },
    removeMember: function(memberId) {
      _teamMembers = _.filter(_teamMembers, function(member) {
        return member.id !== memberId;
      });
      TeamStore.emit(TEAM_MEMBERS_CHANGED);
    },
    addTeamMemberChangeListener: function(callback) {
      this.on(TEAM_MEMBERS_CHANGED, callback);
    },
    removeTeamMemberChangeListener: function(callback) {
      this.removeListener(TEAM_MEMBERS_CHANGED, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TeamConstants.TEAM_MEMBERS_RECEIVED:
          resetTeam(payload.teamMembers, payload.teamName);
          break;
      }
    })
  });

}(this));

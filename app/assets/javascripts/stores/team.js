(function(root) {
  'use strict';

  var _workoutsForTeam = {};
  var TEAM_WORKOUTS_CHANGED = "TEAM_WORKOUTS_CHANGED";

  var resetTeamWorkouts = function(workoutsForTeam) {
    _workoutsForTeam = workoutsForTeam;
    TeamStore.emit(TEAM_WORKOUTS_CHANGED);
  };

  root.TeamStore = $.extend({}, EventEmitter.prototype, {
    workoutsForTeam: function() {
      return _workoutsForTeam;
    },
    addTeamWorkoutsChangeListener: function(callback) {
      this.on(TEAM_WORKOUTS_CHANGED, callback);
    },
    removeTeamWorkoutsChangeListener: function(callback) {
      this.removeListener(TEAM_WORKOUTS_CHANGED);
    },
    DispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case TeamConstants.TEAM_WORKOUTS_RECEIVED:
          resetTeamWorkouts(payload.workoutsForTeam);
          break;
      }
    })
  });

}(this));

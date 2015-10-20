(function(root) {
  'use strict';

  var _last_week = [];
  var _last_month = [];
  var _current_month = [];
  var _current_year = [];
  var LEADERBOARDS_UPDATED = "LEADERBOARDS_UPDATED";

  var updateLeaderboards = function(leaderboardData) {
    _last_week = leaderboardData.last_week;
    _last_month = leaderboardData.last_month;
    _current_month = leaderboardData.current_month;
    _current_year = leaderboardData.current_year;
    LeaderboardStore.emit(LEADERBOARDS_UPDATED);
  };

  root.LeaderboardStore = $.extend({}, EventEmitter.prototype, {
    last_week: function() {
      return _last_week.slice();
    },
    last_month: function() {
      return _last_month.slice();
    },
    current_month: function() {
      return _current_month.slice();
    },
    current_year: function() {
      return _current_year.slice();
    },
    addLeaderboardChangeEventListener: function(callback) {
      this.on(LEADERBOARDS_UPDATED, callback);
    },
    removeLeaderboardChangeEventListener: function(callback) {
      this.removeListener(LEADERBOARDS_UPDATED, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case LeaderboardConstants.LEADERBOARDS_RECEIVED:
          updateLeaderboards(payload.leaderboardData);
          break;
      }
    })
  });

}(this));

(function(root) {
  'use strict';

  var _username = "";
  var USERNAME_CHANGED = "USERNAME_CHANGED";

  var updateUsername = function(username) {
    _username = username;
    CalendarStore.emit(USERNAME_CHANGED);
  };

  root.CalendarStore = $.extend({}, EventEmitter.prototype, {
    username: function() {
      return _username.slice();
    },
    addUsernameChangeListener: function(callback) {
      this.on(USERNAME_CHANGED, callback);
    },
    removeUsernameChangeListener: function(callback) {
      this.removeListener(USERNAME_CHANGED, callback);
    },
    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case CalendarConstants.USERNAME_RECIEVED:
          updateUsername(payload.username);
          break;
      }
    })
  });
}(this));

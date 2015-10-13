(function (root) {
  'use strict';

  var _workouts = [];
  var WORKOUT_ADDED_EVENT = "WORKOUT_ADDED_EVENT";



  var addWorkout = function (workout) {
    _workouts.push(workout);
    WorkoutStore.emit(WORKOUT_ADDED_EVENT);
  };

  root.WorkoutStore = $.extend({}, EventEmitter.prototype, {
    addNewWorkoutListener: function (callback) {
      this.on(WORKOUT_ADDED_EVENT, callback);
    },
    removeNewWorkoutListener: function (callback) {
      this.removeListener(WORKOUT_ADDED_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case WorkoutConstants.WORKOUT_RECEIVED:
          addWorkout(payload.workout);
          break;
      }
    })
  });

}(this));

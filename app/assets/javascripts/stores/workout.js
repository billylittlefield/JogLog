(function (root) {
  'use strict';

  var _workouts = [];
  var WORKOUT_ADDED_EVENT = "WORKOUT_ADDED_EVENT";
  var CALENDAR_CHANGED_EVENT = "CALENDAR_CHANGED_EVENT";

  var addWorkout = function(workout) {
    _workouts.push(workout);
    WorkoutStore.emit(WORKOUT_ADDED_EVENT);
  };

  var resetWorkouts = function(workouts) {
    _workouts = workouts;
    WorkoutStore.emit(CALENDAR_CHANGED_EVENT);
  };

  root.WorkoutStore = $.extend({}, EventEmitter.prototype, {
    filteredWorkouts: function() {
      return _workouts.slice(0);
    },
    retrieveWorkoutsForDate: function(date) {
      return _workouts.filter(function(workout){
        return moment(workout.date.substring(0,10)).isSame(date, 'day');
      });
    },
    addNewWorkoutListener: function(callback) {
      this.on(WORKOUT_ADDED_EVENT, callback);
    },
    removeNewWorkoutListener: function(callback) {
      this.removeListener(WORKOUT_ADDED_EVENT, callback);
    },
    AddCalendarChangeListener: function(callback) {
      this.on(CALENDAR_CHANGED_EVENT, callback);
    },
    removeCalendarChangeListener: function(callback) {
      this.removeListener(CALENDAR_CHANGED_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case WorkoutConstants.WORKOUT_RECEIVED:
          addWorkout(payload.workout);
          break;
        case WorkoutConstants.FILTERED_WORKOUTS_RECEIVED:
          resetWorkouts(payload.workouts);
          break;
      }
    })
  });

  WorkoutStore.setMaxListeners(50);

}(this));

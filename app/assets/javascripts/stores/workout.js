(function (root) {
  'use strict';

  var _workouts = [];
  var WORKOUT_ADDED = "WORKOUT_ADDED";
  var CALENDAR_CHANGED = "CALENDAR_CHANGED";

  var addWorkout = function(workout) {
    _workouts.push(workout);
    WorkoutStore.emit(WORKOUT_ADDED);
  };

  var resetWorkouts = function(workouts) {
    console.log("workouts_reset");
    _workouts = workouts;
    WorkoutStore.emit(CALENDAR_CHANGED);
  };

  root.WorkoutStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _workouts.slice();
    },
    workoutsForDay: function(date, userId) {
      return _workouts.filter(function(workout){
        return moment(workout.date.substring(0,10)).isSame(date, 'day') &&
                     (workout.user_id === userId);
      });
    },
    workoutsForWeek: function(weekStart, userId) {
      return _workouts.filter(function(workout){
        return moment(workout.date.substring(0,10))
               .isBetween(weekStart.clone().subtract(1, 'days'),
                          weekStart.clone().add(7, 'days')) &&
                      workout.user_id === userId;
      });
    },
    addNewWorkoutListener: function(callback) {
      this.on(WORKOUT_ADDED, callback);
    },
    removeNewWorkoutListener: function(callback) {
      this.removeListener(WORKOUT_ADDED, callback);
    },
    addCalendarChangeListener: function(callback) {
      this.on(CALENDAR_CHANGED, callback);
    },
    removeCalendarChangeListener: function(callback) {
      this.removeListener(CALENDAR_CHANGED, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      switch (payload.actionType) {
        case WorkoutConstants.WORKOUT_RECEIVED:
          addWorkout(payload.workout);
          break;
        case WorkoutConstants.WORKOUTS_RECEIVED:
          resetWorkouts(payload.workouts);
          break;
      }
    })
  });

  WorkoutStore.setMaxListeners(50);

}(this));

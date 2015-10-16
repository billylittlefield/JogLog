(function (root) {
  'use strict';

  var _workouts = [];
  var WORKOUT_ADDED_EVENT = "WORKOUT_ADDED_EVENT";
  var CALENDAR_CHANGED_EVENT = "CALENDAR_CHANGED_EVENT";
  var TEAM_WORKOUTS_CHANGED = "TEAM_WORKOUTS_CHANGED";

  var addWorkout = function(workout) {
    _workouts.push(workout);
    WorkoutStore.emit(WORKOUT_ADDED_EVENT);
  };

  var resetWorkoutsForPersonalCal = function(workouts) {
    _workouts = workouts;
    WorkoutStore.emit(CALENDAR_CHANGED_EVENT);
  };

  var resetWorkoutsForTeamCal = function(workoutsForTeam) {
    _workouts = [];
    _.each(workoutsForTeam.members, function(member){
      _workouts = _workouts.concat(member.workouts);
    });
    WorkoutStore.emit(TEAM_WORKOUTS_CHANGED);
  };

  root.WorkoutStore = $.extend({}, EventEmitter.prototype, {
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
      this.on(WORKOUT_ADDED_EVENT, callback);
    },
    removeNewWorkoutListener: function(callback) {
      this.removeListener(WORKOUT_ADDED_EVENT, callback);
    },
    addTeamWorkoutsChangeListener: function(callback) {
      this.on(TEAM_WORKOUTS_CHANGED, callback);
    },
    removeTeamWorkoutsChangeListener: function(callback) {
      this.removeListener(TEAM_WORKOUTS_CHANGED);
    },
    addCalendarChangeListener: function(callback) {
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
        case WorkoutConstants.PERSONAL_WORKOUTS_RECEIVED:
          resetWorkoutsForPersonalCal(payload.workouts);
          break;
        case WorkoutConstants.TEAM_WORKOUTS_RECEIVED:
          resetWorkoutsForTeamCal(payload.workoutsForTeam);
          break;
      }
    })
  });

  WorkoutStore.setMaxListeners(50);

}(this));

window.ApiUtil = {
  createWorkout: function (workout) {
    workout.duration = parseTime(workout.hours,workout.minutes,workout.seconds);
    $.ajax({
      url: "api/workouts",
      method: "POST",
      data: { workout: workout },
      success: function (workout) {
        console.log(workout);
        ApiActions.receiveWorkout(workout);
      }
    });
  }
};

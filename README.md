# JoggerLogger

[Live Link][live]

[live]: http://www.joglog.me

## Application Description

JogLog is a social exercise-tracking web application inspired by LogARun.com and MapMyRun. The site was developed by Billy Littlefield using React.js on a Rails back-end. Users can track their workouts in an interactive calendar interface and view weekly summary statistics for each activity. On the home dashboard, users can see the activity feed for everyone they are following. Through the leaderboard display, the top 10 users are recorded for a number of date ranges. Using the filter interface, the query can be adjusted to filter by activity-type, gender, and user-group in real-time.

## Features

* Secure user authentication using BCrypt
* Workout form with duration parsing and selections for distance-unit / activity-type
* Interactive calendar with modal views toggled by clicking on day
* Weekly totals by activity for distance, duration, and average pace
* 'Follow'  other users to track their recent workouts on activity feed
* Join a team with other friends to view week's workouts of all team members
* Leaderboard showcasing most distance in the last week, month, and year
* Filter interface to adjust leaderboards by activity-type, gender, and user-group
* Team/User search in Navbar

## App Components

### User Authentication

During user/session creation, the password typed into the form is used to create a hashed and salted password_digest via BCrypt. Only the digest itself is stored in the database, ensuring secure login. Session tokens are generated using SecureRandom and ensure that logging in to the same account from a different location will disable any functionality from the original session. Before all controller actions, current_user is checked with the session token and redirects to sign-in page if the user has logged in elsewhere. Usernames are case insensitive for ease of use.


### Calendar

The calendar page is constructed using React.js with much help from the [moment.js] library for date manipulation. The calendar component heirarchy is as such:
* calendar
  * header
    * follow-button
    * next/prev month selection
  * day-names
  * weeks
    * days
    * week-totals

Weeks are continuously added to the calendar until the start of the week is no longer in the current month. Props including workouts, user, current_month, and date are passed down the hierarchy to the 'Day' component. As a result, the calendar includes an event listener for any added workout so that it can update its view and the summary totals accordingly. Each day also contains a modal view that is hidden by default. Upon clicking on a day, the appropriate modal is displayed -- if the user is viewing their calendar, they will either see the 'Edit' or 'New' workout form depending on whether they clicked on a blank day or a day with a pre-existing workout. When viewing another user's calendar, the modal shows a static 'Read-only' modal with no input fields.

If a user is logging more than one activity in a week (or day), a multi-workout header will appear at the top of the calendar cell. This allows the user to cycle through their workouts by activity and view data in clean format. The meat of the calendar cell shows the workout duration, distance, and average pace (if it can be calculated):
```jsx
workoutItem: function() {
  if (this.state.dayWorkouts.length > 0) {
    var displayWorkout = this.state.dayWorkouts[this.state.displayIdx];
    return (
      <div onClick={this.toggleModal} className="workout-item">
        <div className="workout-title">{displayWorkout.title}</div>
        {this.workoutItemDistance(displayWorkout)}
        {this.workoutItemTime(displayWorkout)}
        {this.workoutItemPace(displayWorkout)}
      </div>
    );
  } else {
    return <div onClick={this.toggleModal} className="workout-item"/>;
  }
}
```

All dates for the calendar cells are derived from today's date in moment format. Using `moment.startOf("month").day("Sunday")` we can derive the week-start from the first week, and then use moment again to add 7 days until entering the next month. Cycling left/right through months simply changes the 'date' state for the calendar by 1 month via `moment.add(1, "month")` and `moment.subtract(1, "month")`.

Because of the calendar's modular design, constructing the team calendar was fairly simple. Rather than viewing an entire month, the team calendar only views one week at a time. The rows represent users, not subsequent weeks. Therefore, rather than pushing week components and incrememnting the week-start by 7 days, I iterate through the team members and push a week component for each:
```jsx
renderWeeks: function() {
  var weeks = [];
  _.each(this.state.teamMembers, function(member) {
    weeks.push( <Week key={"user" + member.id +
                           "team" + this.props.params.teamid}
                      user={member}
                      weekStart={this.state.weekStart.clone()}
                      type="team" /> );
  }.bind(this));
  return weeks;
}
```

[moment.js]: http://momentjs.com/


- [ ] Add 'private' option to Team so owner must approve 'Join Team' requests
- [ ] Track shoes for users to keep track of total mileage
- [ ] Add message board to Team page
- [ ] Linking workouts with other users to auto fill their calendars
- [ ] 'Like' feature on workouts (in addition to comments)
- [ ] Profile (running) pictures for users that cycle on homepage
- [ ] RSS feed on homepage with running news
- [ ] Create monthly / weekly status reports on homepage
- [ ] Add tags to workout (#easy, #longrun, #intervals) and search by tags
- [ ] Change 'follow' feature to 'friend' feature, add notifications
- [ ] Garmin upload for GPS watch to auto-fill workout form
- [ ] Forums for users to discuss running topics

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md

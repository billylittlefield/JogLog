# JoggerLogger

[Heroku link][heroku]

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

JoggerLogger is an exercise-tracking web application inspired by LogARun.com
built using Ruby on Rails and React.js. JoggerLogger allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete workouts
- [ ] View workouts in a 'calendar view' (by month)
- [ ] See weekly and monthly totals in 'calendar view'
- [ ] Create / join a 'team' comprised of other users
- [ ] View team members' workouts all together in 'team view'
- [ ] Comment on other users workouts
- [ ] 'Follow' users and see most recent workouts by followed users on homepage
- [ ] View user leaderboards for most miles in past 7 days
- [ ] User / team search functionality from Navbar

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]
* [Routes table][routes]

[view]: ./docs/views.md
[schema]: ./docs/schema.md
[routes]: ./docs/routes.md

## Implementation Timeline

### Phase 1: User Authentication, Workout Model and JSON API (1.5 days)

In Phase 1, I will implement user signup and session authentication (using
BCrypt). There will be rough pages for sign in / sign up just to verify
functionality, and the sign-in landing page will be the root where the highest-
nested React 'Home' component will live. Accessing any part of the site aside
from the new session / new user will result in a redirect. I will then set up
the JSON API for the Workout model.

[Details][phase-one]

### Phase 2: Flux Setup and Workout CRUD (1 day)

Phase 2 consists of getting the Flux architecture up and running for the
Workout model. This will include a Workout store that will update the eventually
update the calendar and workout feed upon change / addition of a Workout
instance. I will create basic versions of the Workout Form and Workout Detail to
test CRUD functionality, and will prevent Users from editing any Workouts aside
from their own. I will also build out the Team model (including the New Team
form) to allow for creation and membership of Teams.

[Details][phase-two]

### Phase 3: Teams (1 day)

Here I will implement the Team feature by building out the Team model (including
the New Team form) to allow for creation and membership of Teams. On the page
for a given team, the functionality should exist to join and leave a team
that updates automatically as a React feature. The "Create Team" will move to
the navbar in phase 4.

[Details][phase-three]

### Phase 4: Navbar and Calendar View (2 days)

In Phase 4, I will add the Navbar to the root 'App' React component and will
style it with bootstrap. I will also implement real-time Search functionality
in the Navbar with clickable results that lead to either Team or User, depending
on the selection of the drop down in the Navbar. I will then create the
CalendarGrid React components for both PersonalCalendar and TeamCalendar to
show a nested WorkoutItem for every given day. I will also add styling to the
calendar views as I build them out to build this up fully before moving on.
The grid boxes in the calendars will be associated with the workout for the
specified user on that given day.

[Details][phase-four]

### Phase 5: Modal Views, Follows, and Comments (1.5 day)

In Phase 5 I will add the smaller-scale models to allow users to 'Follow' and
'Unfollow' other Users, as well as create 'Comments' on Workouts. This phase
will also include the implementation of modal views for the New Workout (if
accessed via Calendar view), New Team, and Workout Detail.

[Details][phase-five]

### Phase 6: Workout Feed and Leaderboards (1 day)

Once the Follow feature is working from Phase 5, I will implement a Workout
Feed feature that allows a user to see the most recent workouts completed by
any users that they are following. These items will be clickable to expand the
Workout Detail modal and allow for commenting. I will also create the
Leaderboards for the homepage by scraping data from the Workouts DB

[Details][phase-six]

### Phase 7: Seeding and Final Styling (1 days)

The bulk styling of the calendar views and Navbar should have been completed by
this point, so in this phase I will finish any lingering styling necessities of
those two components then finish styling the homepage and Form views. I will
also add enough seed data to showcase the social aspect of this run-logging
site, and test every aspect of the site to look for any bugs.

[Details][phase-seven]

### Bonus Features (TBD)
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
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md

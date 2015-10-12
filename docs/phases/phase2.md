# Phase 2: Flux Setup, Workout CRUD, Teams (2 days)

## Rails
### Models
* Team
* Membership

### Controllers
* Api::TeamsController (create, destroy, show)
* Api::MembershipsController (create, destroy, index)

### Views

## Flux
### Views (React Components)
* ReactRouter / Routes
* WorkoutForm
* WorkoutDetail
* TeamForm

### Stores
* Workout
* Team

### Actions
* ApiActions.receiveAllWorkouts
* ApiActions.receiveSingleWorkout
* ApiActions.receiveAllMemberships

### ApiUtil
* ApiUtil.fetchAllWorkouts
* ApiUtil.createWorkout
* ApiUtil.updateWorkout
* ApiUtil.destroyWorkout
* ApiUtil.createMembership
* ApiUtil.destroyMembership

## Gems/Libraries
* Flux Dispatcher
* Twitter Bootstrap

json.workouts @workouts_by_month_and_user do |workout|
  json.id workout.id
  json.user_id workout.user_id
  json.user_username workout.user.username
  json.title workout.title
  json.date workout.date
  json.distance workout.distance
  json.duration workout.duration
  json.activity workout.activity
  json.notes workout.notes
  json.comments workout.comments do |comment|
    json.author comment.author.username
    json.author_id comment.author_id
    json.workout_id comment.workout_id
    json.body comment.body
    json.created_at comment.created_at
  end
end
json.username @user.username

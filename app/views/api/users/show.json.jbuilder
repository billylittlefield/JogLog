json.teams @user.teams do |team|
  json.id team.id
  json.name team.name
end

json.memberships @user.memberships do |membership|
  json.merge! membership
end

json.followees @user.followees do |followee|
  json.merge! followee
end

json.feed_workouts @feed_workouts do |workout|
  json.id workout.id
  json.user_id workout.user_id
  json.user_username workout.user.username
  json.title workout.title
  json.notes workout.notes
  json.distance workout.distance
  json.duration workout.duration
  json.activity workout.activity
  json.date workout.date
end

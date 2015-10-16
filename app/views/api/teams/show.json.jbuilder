json.(@team, :id, :admin_id, :name, :created_at, :updated_at)

json.admin do
  json.username
end

json.members @team.members do |member|
  json.id member.id
  json.username member.username
  json.workouts Workout.find_by_week_and_user(member.id, @week_start) do |workout|
    json.merge! workout
  end
end

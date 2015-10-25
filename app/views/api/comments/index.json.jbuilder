json.comments @comments do |comment|
  json.id comment.id
  json.body comment.body
  json.author_id comment.author_id
  json.workout_id comment.workout_id
  json.created_at comment.created_at
  json.author comment.author.username
end

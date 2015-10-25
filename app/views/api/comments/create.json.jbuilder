json.(@comment, :id, :body, :author_id, :workout_id, :created_at)

json.author @comment.author.username

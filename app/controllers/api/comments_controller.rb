class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    render json: @comment if @comment.save
  end

  def index
    @comments = Comment.where("workout_id = ?", params[:workout_id])
    render json: @comments
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :author_id, :workout_id)
  end

end

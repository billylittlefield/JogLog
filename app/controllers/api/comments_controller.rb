class Api::CommentsController < ApplicationController
  before_action :require_login

  def create
    @comment = Comment.new(comment_params)
    fail if !@comment.save
  end

  def index
    @comments = Comment.where("workout_id = ?", params[:workout_id]).includes(:author)
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :author_id, :workout_id)
  end

end

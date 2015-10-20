class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    followee_ids = [current_user.id];
    @user.followees.each do |followee|
      followee_ids.push(followee.id)
    end
    @feed_workouts = Workout.find_feed_workouts(followee_ids)
  end

  def search
    if params[:query].present?
      @users = User.where("lower(username) ~ ?", params[:query].downcase)
    else
      @users = User.none
    end
    render json: @users
  end
end

class Api::WorkoutsController < ApplicationController
  before_action :require_login

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id
    if @workout.save
      render json: @workout
    else
      fail
    end
  end

  def index
    @workouts_by_month_and_user = Workout.find_by_month_and_user(params)
    @user = User.find(params[:user_id])
  end

  def update
    @workout = Workout.find(params[:id])
    if @workout.update(workout_params)
      render json: @workout
    else
      fail
    end
  end

  def leaderboard
    @last_week = Workout.last_week_leaders
    @last_month = Workout.last_month_leaders
    @current_month = Workout.current_month_leaders
    @current_year = Workout.current_year_leaders
  end

  private

  def workout_params
    params.require(:workout)
          .permit(:title, :activity, :date, :distance, :duration, :notes)
  end
end

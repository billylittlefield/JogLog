class Api::WorkoutsController < ApplicationController
  before_action :require_login

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id
    @workout.miles_equivalent = @workout.distance
    if (@workout.distance > 0 && @workout.distance_unit != "miles")
      if @workout.distance_unit == "kilometers"
        @workout.miles_equivalent = (@workout.distance * 0.621371).round(2)
      elsif @workout.distance_unit == "meters"
        @workout.miles_equivalent = (@workout.distance * 0.000621371).round(2)
      elsif @workout.distance_unit == "yards"
        @workout.miles_equivalent = (@workout.distance * 0.000568182).round(2)
      end
    end
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
    @last_week = Workout.get_leaders_since((Date.today - 6), params, current_user)
    @last_month = Workout.get_leaders_since((Date.today - 30), params, current_user)
    @current_month = Workout.get_leaders_since(Date.today.beginning_of_month, params, current_user)
    @current_year = Workout.get_leaders_since(Date.today.beginning_of_year, params, current_user)
  end

  private

  def workout_params
    params.require(:workout)
          .permit(:title, :activity, :date, :distance, :distance_unit, :duration, :notes)
  end
end

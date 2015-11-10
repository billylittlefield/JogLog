class Api::WorkoutsController < ApplicationController
  before_action :require_login

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id
    @workout.miles_equivalent = parse_distance(@workout.distance,
                                               @workout.distance_unit)
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
    miles_equivalent = parse_distance(params[:workout][:distance].to_i,
                                      params[:workout][:distance_unit])
    new_params = workout_params.merge({"miles_equivalent": miles_equivalent.to_s})
    if @workout.user_id == current_user.id && @workout.update(new_params)
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

  def parse_distance(distance, distance_unit)
    miles_equivalent = distance.round(2)
    if (distance > 0 && distance_unit != "miles")
      if distance_unit == "kilometers"
        miles_equivalent = (distance * 0.621371).round(2)
      elsif distance_unit == "meters"
        miles_equivalent = (distance * 0.000621371).round(2)
      elsif distance_unit == "yards"
        miles_equivalent = (distance * 0.000568182).round(2)
      end
    end
    return miles_equivalent
  end

  def workout_params
    params.require(:workout)
          .permit(:title, :activity, :date, :distance, :distance_unit, :duration, :notes)
  end
end

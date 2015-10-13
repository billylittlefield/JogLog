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

  private

  def workout_params
    params.require(:workout)
          .permit(:title, :activity, :date, :distance, :duration, :notes)
  end
end

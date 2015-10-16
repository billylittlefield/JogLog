class Api::TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
    @week_start = params[:week_start]
  end
end

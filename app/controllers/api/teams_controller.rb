class Api::TeamsController < ApplicationController
  def show
    @team = Team.find(params[:id])
    @week_start = params[:week_start]
  end

  def create
    @team = Team.new(team_params)
    @team.admin_id = current_user.id
    p @team
    if @team.save
      render json: @team
    else
      fail
    end
  end

  private

  def team_params
    params.require(:team).permit(:name, :admin_id);
  end
end

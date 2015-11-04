class Api::MembershipsController < ApplicationController
  before_action :require_login

  def create
    @membership = Membership.new({ member_id: current_user.id,
                                   team_id: params[:team_id] })
    if @membership.save
      render json: @membership
    else
      fail
    end
  end

  def destroy
    @membership = current_user.memberships.find_by(team_id: params[:team_id])
    if @membership.destroy!
      render json: @membership
    else
      fail
    end
  end
end

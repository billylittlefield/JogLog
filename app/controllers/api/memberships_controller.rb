class Api::MembershipsController < ApplicationController

  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render json: @membership
    else
      fail
    end
  end

  private

  def membership_params
    params.require(:membership).permit(:member_id, :team_id);
  end
end

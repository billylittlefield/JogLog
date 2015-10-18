class Api::MembershipsController < ApplicationController

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
    @membership = current_user.memberships.find_by(team_id: params[:team_id]);
    if @membership.destroy!
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

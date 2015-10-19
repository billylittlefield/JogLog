class Api::FollowsController < ApplicationController

  def create
    @follow = Follow.new({ follower_id: current_user.id,
                           followee_id: params[:followee_id] })
    if @follow.save
      render json: @follow
    else
      fail
    end
  end

  def destroy
    @follow = current_user.out_follows.find_by(followee_id: params[:followee_id])
    if @follow.destroy!
      render json: @follow
    else
      fail
    end
  end
end

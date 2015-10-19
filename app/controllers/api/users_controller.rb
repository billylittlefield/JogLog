class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def search
    if params[:query].present?
      @users = User.where("lower(username) ~ ?", params[:query].downcase)
    else
      @users = User.none
    end
    render json: @users
  end
end

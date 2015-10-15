class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    available = User.username_available(@user.username)
    if available && @user.save
      sign_in(@user)
      redirect_to controller: "static_pages", action: "root"
    else
      flash.now[:errors] = @user.errors.full_messages
      flash.now[:errors].push("Username already taken") if !available
      fail
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end

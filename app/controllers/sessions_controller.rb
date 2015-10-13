class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      sign_in(@user)
      redirect_to HOMEPAGE
    else
      flash.now[:errors] = ["Invalid Credentials"]
      @user = User.new(username: params[:user][:username])
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
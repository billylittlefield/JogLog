Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]

  namespace :api, defaults: {format: :json} do
    resources :workouts, only: [:create, :index, :update]
    resources :teams, only: [:show, :create] do
      resource :membership, only: [:create, :destroy]
    end
    resources :users, only: [:show] do
      resource :follow, only: [:create, :destroy]
    end
  end
end

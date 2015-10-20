Rails.application.routes.draw do
  root to: "static_pages#root"

  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]

  namespace :api, defaults: {format: :json} do
    resources :workouts, only: [:create, :index, :update, :destroy] do
      get "leaderboard", on: :collection
      resources :comments, only: [:create, :index, :destroy]
    end
    resources :teams, only: [:show, :create] do
      get "search", on: :collection
      resource :membership, only: [:create, :destroy]
    end
    resources :users, only: [:show] do
      get "search", on: :collection
      resource :follow, only: [:create, :destroy]
    end
  end
end

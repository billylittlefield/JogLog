Rails.application.routes.draw do
  root to: "sessions#new"
  resource :session, only: [:create, :new, :destroy]
  resources :users, only: [:create, :new]
end

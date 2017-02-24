Rails.application.routes.draw do
  resources :categories
  devise_for :users
  resources :articles do
  	resources :comments, only: [:create, :destroy, :update]
  end
  root 'welcome#index'

  get "/dashboard", to: "welcome#dashboard"
  put "/articles/:id/publish", to: "articles#publish"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

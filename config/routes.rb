Rails.application.routes.draw do
  resources :institutions
  resources :categories
  devise_for :users, :path => 'accounts'
  resources :profiles, only: [:index, :show]
  # resources :users, only: [:index] do
  #   resources :profiles, only: [:index, :show]
  # end

  resources :articles do
  	resources :comments, only: [:create, :destroy, :update]
  end
  root 'welcome#index'

  get "/dashboard", to: "welcome#dashboard"
  put "/articles/:id/publish", to: "articles#publish"
  put "/articles/:id/read_later", to: "articles#mark_as_read_later"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

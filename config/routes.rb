Rails.application.routes.draw do
  resources :contacts, only: [:new, :create]
  resources :notices
  resources :institutions
  resources :categories
  devise_for :users, :path => 'accounts'
  resources :profiles, only: [:index, :show] do
    member do
      get 'authors'
    end
  end
  # resources :users, only: [:index] do
  #   resources :profiles, only: [:index, :show]
  # end
  get "/articles/search", to: "articles#search"

  resources :articles do
    resources :comments, only: [:create, :destroy, :update]
  end
  root 'welcome#index'

  get "/dashboard", to: "welcome#dashboard"
  get "/about", to: "welcome#about"
  put "/articles/:id/publish", to: "articles#publish"
  put "/articles/:id/read_later", to: "articles#mark_as_read_later"
  put "/notices/:id/publish", to: "notices#publish"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

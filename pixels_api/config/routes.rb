Rails.application.routes.draw do
  resources :artworks
  resources :users
  post '/users-login', to: 'users#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

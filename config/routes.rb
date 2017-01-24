Rails.application.routes.draw do
  resources :meals
  get "/calander" => 'meals#calander'
  root "visitors#index"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

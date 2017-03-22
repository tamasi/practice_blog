class WelcomeController < ApplicationController
  before_action :authenticate_admin!, only: [:dashboard]
  before_action :set_joinus, only: [:index]

  def index

  end
  def show
  	
  end
  def dashboard
  	@articles = Article.all
  end
end

class WelcomeController < ApplicationController
  before_action :authenticate_admin!, only: [:dashboard]
  before_action :set_joinus, only: [:index, :dashboard]

  def index
    @articles = Article.ultimos
  end
  def show
  	
  end
  def dashboard
  	@articles = Article.all
    @notices = Notice.all
  end
end

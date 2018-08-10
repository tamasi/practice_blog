class WelcomeController < ApplicationController
  before_action :authenticate_admin!, only: [:dashboard]
  before_action :set_joinus, only: [:index, :dashboard, :about]
  layout "article_lay", only: [:about]
  def index
    @articles = Article.ultimos
    @notices = Notice.all
  end
  def show
  	
  end
  def dashboard
  	@articles = Article.all
    @notices = Notice.all
  end
  def about
    
  end
end

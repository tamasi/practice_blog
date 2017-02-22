class ArticlesController < ApplicationController
	before_filter :find_model
	before_action :authenticate_user!, except: [:show,:index]
	before_action :set_article, except: [:index,:new,:create]

	#GET /articles
	def index 
		@articles = Article.all
	end
	
	#GET /articles/:id
	def show
		@article.update_visits_count
	end

	#GET /articles/new
	def new
		@article = Article.new
	end

	#POST /articles
	def create
		@article = current_user.articles.new(article_params)
		if @article.save
			redirect_to @article
		else
			render :new
		end
	end

	#PUT /articles/update
	def update
		if @article.update(article_params)
			redirect_to @article
		else
			render :edit
		end
	end
	def edit
		
	end

	def destroy
		
		@article.destroy
		redirect_to articles_path
	end

	private
	def find_model
		@model = Article.find(params[:id]) if params[:id]
	end

	def article_params
		params.require(:article).permit(:title,:body)
	end

	def set_article
		@article = Article.find(params[:id])
	end
end
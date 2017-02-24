class ArticlesController < ApplicationController
	before_filter :find_model
	before_action :authenticate_user!, except: [:show,:index]
	before_action :set_article, except: [:index,:new,:create]
	before_action :authenticate_editor!, only: [:new,:create,:update]
	before_action :authenticate_admin!, only:[:new, :create,:update,:destroy]

	#GET /articles
	def index 
		@articles = Article.all
	end
	#GET /articles/:id
	def show
		@article.update_visits_count
		@comment = Comment.new
	end
	#GET /articles/new
	def new
		@article = Article.new
		@categories = Category.all
	end

	#POST /articles
	def create
		@article = current_user.articles.new(article_params)
		@article.categories = params[:categories]
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
		params.require(:article).permit(:title,:body, :cover, :categories)
	end

	def set_article
		@article = Article.find(params[:id])
	end
end
class ArticlesController < ApplicationController
	before_filter :find_model
	before_action :authenticate_user!, except: [:show,:index]
	before_action :set_article, except: [:index,:new,:create]
	before_action :authenticate_admin!, only:[:destroy, :publish]
	before_action :authorization_for_editors_and_admins, only: [:new, :create, :update]
	before_action :set_joinus, only:[:new]

	layout "article_lay", only: [:show, :edit, :update]

	#GET /articles
	def index 
		@articles = Article.paginate(page: params[:page],per_page:5).publicados.ultimos
		render :layout => false
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
		@article.categories = params[:categories]
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

	def publish
		@article.publish!
		redirect_to @article
	end

	def mark_as_read_later
		ReadLater.create(article_id: @article.id, profile_id: current_user.profile.id)
		redirect_to @article
	end


	private
	def find_model
		@model = Article.find(params[:id]) if params[:id]
	end

	def article_params
		params.require(:article).permit(:title,:body, :cover, :categories, :subtitle, :how_quote, :artpdf)
	end

	def set_article
		@article = Article.find(params[:id])
	end

	def set_institutions
		@institutions = Institution.all
	end
end
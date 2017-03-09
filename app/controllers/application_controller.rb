class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_categories
  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

	def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update) do |user_params|
      user_params.permit(:email, :password, :password_confirmation, :current_password, profile_attributes: [:id, :first_name, :last_name, :about])
    end
  end

  def authenticate_editor!
		redirect_to root_path unless user_signed_in? && current_user.is_editor?
	end

	def authenticate_admin!
		redirect_to root_path unless user_signed_in? && current_user.is_admin?
	end

  def authorization_for_editors_and_admins
    redirect_to root_path unless user_signed_in? && current_user.is_admin? || current_user.is_editor?
  end

  private
  def set_categories
  	@categories = Category.all
  end
end

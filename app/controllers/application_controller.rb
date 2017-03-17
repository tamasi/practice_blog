class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_categories
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_institution_for_profile, if: :devise_controller?
  after_action :save_institutions, if: :devise_controller?


  protected

  def set_institution_for_profile
    @institutions = Institution.all
  end

  def save_institutions
    puts("llamo a save institutions")
    unless params[:institution].nil?
      puts("entro en el unless")
      params[:institution].each do |institution_id|
        HasInstitution.create(institution_id: institution_id, profile_id: @current_user.profile.id)
      end
    end
  end

	def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update) do |user_params|
      user_params.permit(:email, :password, :password_confirmation, :current_password, :avatar, profile_attributes: [:id, :first_name, :last_name, :about], institutions:[:id])
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

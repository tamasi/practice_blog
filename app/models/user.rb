class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :articles
  has_many :comments
  has_one :profile
  accepts_nested_attributes_for :profile

  after_create :create_profile

  #Metodo de paperclip para agregar los archivos de imagenes al modelo
	has_attached_file :avatar, styles: { medium: "1280x720", thumb: "800x600" }
	#validación para que solo se permitan los archivos que nosotros queremos - la expresión regular es para permitir todo tipo de archivos de imagenes
	validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

	include PermissionsConcern
	
	def gravatar
		email_address = self.email.downcase
 
		# create the md5 hash
		hash = Digest::MD5.hexdigest(email_address)
		 
		# compile URL which can be used in <img src="RIGHT_HERE"...
		image_src = "https://www.gravatar.com/avatar/#{hash}"
	end
	
	private

	def create_profile
		self.build_profile
	end

	
end

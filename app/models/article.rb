class Article < ApplicationRecord
	belongs_to :user
	has_many :comments
	
	validates :title, presence: true, uniqueness: true
	validates :body, presence: true, length: { minimum: 20 }
	before_create :set_visits_count
	after_create :save_categories

	#Metodo de paperclip para agregar los archivos de imagenes al modelo
	has_attached_file :cover, styles: { medium: "1280x720", thumb: "800x600" }
	#validación para que solo se permitan los archivos que nosotros queremos - la expresión regular es para permitir todo tipo de archivos de imagenes
	validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

	#custom setter. Nos permite asignar valor a un atributo de un objeto
	def categories=(value)
		@categories = value
	end

	def update_visits_count
		self.update(visits_count: self.visits_count + 1)
	end
	
	private

	def set_visits_count
		self.visits_count = 0
	end

	def save_categories
		@categories.each do |category_id|
			HasCategory.create(category_id: category_id, article_id: self.id)
		end
	end
end

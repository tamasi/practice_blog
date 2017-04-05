class Article < ApplicationRecord
	include AASM

	belongs_to :user
	has_many :comments

	has_many :has_categories
	has_many :categories, through: :has_categories

	has_many :read_later
	has_many :profiles, through: :read_later 
	
	validates :title, presence: true, uniqueness: true
	validates :body, length: { minimum: 20 }
	before_create :set_visits_count
	after_create :save_categories
	after_update :save_categories

	#Metodo de paperclip para agregar los archivos de imagenes al modelo
	has_attached_file :cover, styles: { medium: "1280x720", thumb: "800x600" }
	#validación para que solo se permitan los archivos que nosotros queremos - la expresión regular es para permitir todo tipo de archivos de imagenes
	validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

	#upload articles in PDF
	has_attached_file :artpdf
	#validation to pdf file
	#validates_attachment_content_type :artpdf, :content_type => { :content_type => %w(application/pdf application/msword application/vnd.openxmlformats-officedocument.wordprocessingml.document) }

	scope :publicados, ->{ where(state: "published") }
	scope :ultimos, ->{ order("created_at DESC") }

	#custom setter. Nos permite asignar valor a un atributo de un objeto
	def categories=(value)
		@categories = value
	end

	def update_visits_count
		self.update(visits_count: self.visits_count + 1)
	end

	def reading_time
		words_per_minute = 150
		text = Nokogiri::HTML(self.body).at('body').inner_text
    	(text.scan(/\w+/).length / words_per_minute).to_i
	end

	aasm column: "state" do
		state :in_draft, initial: true
		state :published

		event :publish do
			transitions from: :in_draft, to: :published
		end

		event :unpublish do
			transitions from: :published, to: :in_draft
		end
	end

	private

	def set_visits_count
		self.visits_count = 0
	end

	def save_categories
		unless @categories.nil?
			@categories.each do |category_id|
				HasCategory.create(category_id: category_id, article_id: self.id)
			end
		end
	end

end

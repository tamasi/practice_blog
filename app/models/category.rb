
class Category < ApplicationRecord
	validates :name, presence: true
	has_many :has_categories
	has_many :articles, through: :has_categories

	has_attached_file :cover, styles: { medium: "1289x720", thumb: "800x600" }
	validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/
end

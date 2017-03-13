class Profile < ApplicationRecord
	belongs_to :user, dependent: :destroy
	has_many :has_institutions
	has_many :institutions, through: :has_institutions
end

class Institution < ApplicationRecord
	has_many :has_institutions
	has_many :profiles, through: :has_institutions
end

class Profile < ApplicationRecord
	belongs_to :user, dependent: :destroy
	has_many :has_institutions
	has_many :institutions, through: :has_institutions

	has_many :read_later
	has_many :articles, through: :read_later
	
	#custom setter for institutions
	# def institutions(value)
	# 	@institutions = value
	# end

	def full_name
		full_name = "#{first_name} #{last_name}"
	end

	private
end

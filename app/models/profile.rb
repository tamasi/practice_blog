class Profile < ApplicationRecord
	belongs_to :user, dependent: :destroy
	has_many :has_institutions
	has_many :institutions, through: :has_institutions
	
	#custom setter for institutions
	# def institutions(value)
	# 	@institutions = value
	# end

	def full_name
		full_name = self.first_name+" "+self.last_name
	end

	private
	
end

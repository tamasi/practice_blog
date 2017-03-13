class HasInstitution < ApplicationRecord
  belongs_to :profile
  belongs_to :institution
end

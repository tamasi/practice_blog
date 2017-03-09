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

 include PermissionsConcern
 private
 def create_profile
 	self.build_profile
 end
end

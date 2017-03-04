class AddCoverToCategories < ActiveRecord::Migration[5.0]
  def change
  	add_attachment :categories, :cover
  end
end

class AddCoverToNotice < ActiveRecord::Migration[5.0]
  def change
  	add_attachment :notices, :cover
  end
end

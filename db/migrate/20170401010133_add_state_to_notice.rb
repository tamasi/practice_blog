class AddStateToNotice < ActiveRecord::Migration[5.0]
  def change
  	add_column :notices, :state, :string, default: "in_draft"
  end
end

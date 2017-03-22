class AddSubtitleToArticle < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :subtitle, :string
  end
end

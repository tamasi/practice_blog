class AddHowQuoteToArticles < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :how_quote, :string
  end
end

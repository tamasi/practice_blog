class AddArticlePdfToArticle < ActiveRecord::Migration[5.0]
  def change
  	add_attachment :articles, :artpdf
  end
end

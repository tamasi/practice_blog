class CreateReadLaters < ActiveRecord::Migration[5.0]
  def change
    create_table :read_laters do |t|
      t.references :article, foreign_key: true
      t.references :profile, foreign_key: true

      t.timestamps
    end
  end
end

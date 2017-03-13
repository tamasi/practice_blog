class CreateHasInstitutions < ActiveRecord::Migration[5.0]
  def change
    create_table :has_institutions do |t|
      t.references :profile, foreign_key: true
      t.references :institutions, foreign_key: true

      t.timestamps
    end
  end
end

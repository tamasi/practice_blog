class RenameIndexAndColumnHasInstitution < ActiveRecord::Migration[5.0]
  def change
  	rename_column(:has_institutions, "institutions_id", "institution_id")
  	rename_index(:has_institutions, "institutions_id", "institution_id")
  end
end

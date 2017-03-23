class RenameReferenceInHasInstitution < ActiveRecord::Migration[5.0]
  def change
  	rename_index :has_institutions, 'institutions_id', 'institution_id'
  end
end

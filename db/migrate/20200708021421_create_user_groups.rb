class CreateUserGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :user_groups do |t|
      t.references :group, foreign_keyt: true
      t.references :user, foreign_keyt: true
      t.timestamps
    end
  end
end

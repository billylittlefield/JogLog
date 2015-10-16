class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.integer :admin_id, null: false
      t.string :name, null: false

      t.timestamps null: false
    end
    add_index :teams, :admin_id
    add_index :teams, :name, unique: true
  end
end

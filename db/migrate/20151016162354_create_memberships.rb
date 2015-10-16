class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false, index: true
      t.integer :team_id, null: false, index: true

      t.timestamps null: false
    end
    add_index :memberships, [:member_id, :team_id], unique: true
  end
end

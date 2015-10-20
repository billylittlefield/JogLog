class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :workout_id, null: false, index: true
      t.integer :author_id, null: false, index: true
      
      t.timestamps null: false
    end
  end
end

class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :activity, null: false
      t.datetime :date, null: false
      t.float :distance
      t.time :duration
      t.text :notes

      t.timestamps null: false
    end
    add_index :workouts, :user_id
  end
end

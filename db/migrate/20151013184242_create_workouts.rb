class CreateWorkouts < ActiveRecord::Migration
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.string :activity, null: false
      t.datetime :date, null: false
      t.float :miles, null: false
      t.time :time, null: false
      t.text :notes

      t.timestamps null: false
    end
    add_index :workouts, :user_id
  end
end

class AddMilesEquivalentToWorkout < ActiveRecord::Migration
  def change
    add_column :workouts, :miles_equivalent, :float
  end
end

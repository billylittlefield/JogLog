class AddDistanceUnitToWorkouts < ActiveRecord::Migration
  def change
    add_column :workouts, :distance_unit, :string
  end
end

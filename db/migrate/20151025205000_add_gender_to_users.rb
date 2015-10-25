class AddGenderToUsers < ActiveRecord::Migration
  def change
    add_column :users, :gender, "char(1)", null: false;
  end
end

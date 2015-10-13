class Workout < ActiveRecord::Base
  validates :user_id, :title, :activity, :date, :miles, :time, presence: true

  belongs_to :user
end

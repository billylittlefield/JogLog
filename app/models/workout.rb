# == Schema Information
#
# Table name: workouts
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  activity   :string           not null
#  date       :datetime         not null
#  distance   :float
#  duration   :time
#  notes      :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Workout < ActiveRecord::Base
  validates :user_id, :title, :activity, :date, presence: true

  belongs_to :user
end

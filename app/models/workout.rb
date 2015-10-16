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

  def self.find_by_month_and_user(params)
    # Moment.js month is zero-indexed -- no adjustment needed to retrieve
    # previous-month #, unless month=0 when we will wrap to 12
    month = params[:month] == "0" ? 12 : params[:month].to_i
    year = params[:year].to_i

    # Range(start_date, end_date) includes full month plus at least 6 day
    # buffer on both ends to account for months starting on Saturday
    start_date = Date.new(year, month, 23)
    end_date = start_date + 44

    Workout.where("(user_id = ?) AND (date BETWEEN ? AND ?)",
                  params[:user_id], start_date, end_date)
  end

  def self.find_by_week_and_user(user_id, week_start)
    start_date = Date.parse(week_start) - 1
    end_date = start_date + 8

    Workout.where("(user_id = ?) AND (date BETWEEN ? AND ?)",
                  user_id, start_date, end_date);
  end
end

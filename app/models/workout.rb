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
  has_many :comments

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
                  user_id, start_date, end_date)
  end

  def self.find_feed_workouts(followee_ids)
    Workout.where(user_id: followee_ids)
           .where("date < ?", Date.tomorrow)
           .limit(10)
           .order(date: :desc, created_at: :desc)
  end

  def self.get_leaders_since(start_date, filters, current_user)
    if (filters['group'] == 'Following')
      Workout.find_by_sql("
        SELECT
          MAX(users.id) AS id, users.username, SUM(workouts.miles_equivalent) AS sum
        FROM
          workouts
        JOIN
          users ON workouts.user_id = users.id
        LEFT JOIN
          (SELECT
            *
          FROM
            follows
          WHERE
            follows.follower_id = '#{current_user.id}'
          ) AS follows ON workouts.user_id = follows.followee_id
        WHERE
          (follows.follower_id = '#{current_user.id}' OR
          workouts.user_id = '#{current_user.id}') AND
          (workouts.date BETWEEN '#{start_date}' AND '#{Date.today}') AND
          workouts.activity = '#{filters['activity']}' AND
          (users.gender = '#{filters['gender'][0]}' OR
          users.gender = '#{filters['gender'][1]}')
        GROUP BY
          users.id
        ORDER BY
          SUM(workouts.miles_equivalent) desc
        LIMIT
          10
      ")
    elsif (filters['group'] == 'Teammates')
      Workout.find_by_sql("
        SELECT
          MAX(users.id) AS id, users.username, SUM(workouts.miles_equivalent) AS sum
        FROM
          workouts
        JOIN
          memberships ON workouts.user_id = memberships.member_id
        JOIN
          users ON users.id = workouts.user_id
        WHERE
          memberships.team_id IN (
            SELECT
              teams.id
            FROM
              teams
            JOIN
              memberships ON memberships.team_id = teams.id
            WHERE
              memberships.member_id = #{current_user.id}
          ) AND
          (workouts.date BETWEEN '#{start_date}' AND '#{Date.today}') AND
          workouts.activity = '#{filters['activity']}' AND
          (users.gender = '#{filters['gender'][0]}' OR
          users.gender = '#{filters['gender'][1]}')
        GROUP BY
          users.username
        ORDER BY
          SUM(workouts.miles_equivalent) desc
        LIMIT
          10
      ")
    else
      Workout.find_by_sql("
        SELECT
          MAX(users.id) AS id, users.username, SUM(workouts.miles_equivalent) AS sum
        FROM
          workouts
        JOIN
          users ON users.id = workouts.user_id
        WHERE
          (workouts.date BETWEEN '#{start_date}' AND '#{Date.today}') AND
          workouts.activity = '#{filters['activity']}' AND
          (users.gender = '#{filters['gender'][0]}' OR
          users.gender = '#{filters['gender'][1]}')
        GROUP BY
          users.username
        ORDER BY
          SUM(workouts.miles_equivalent) desc
        LIMIT
          10
      ")
    end
  end
end

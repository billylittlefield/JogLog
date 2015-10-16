# == Schema Information
#
# Table name: memberships
#
#  id         :integer          not null, primary key
#  member_id  :integer          not null
#  team_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Membership < ActiveRecord::Base
  validates :member_id, :team_id, presence: true
  validates :member_id, uniqueness: {scope: :team_id}

  belongs_to :member, class_name: "User", foreign_key: :member_id
  belongs_to :team, class_name: "Team", foreign_key: :team_id
end

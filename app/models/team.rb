# == Schema Information
#
# Table name: teams
#
#  id         :integer          not null, primary key
#  admin_id   :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Team < ActiveRecord::Base
  validates :admin_id, :name, presence: true
  validates :name, uniqueness: true

  belongs_to :admin, class_name: "User", foreign_key: :admin_id
  has_many :memberships
  has_many :members, through: :memberships
end

# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: {case_sensitive: false}
  validates :session_token, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}

  has_many :workouts
  has_many :owned_teams, class_name: "Team", foreign_key: :admin_id
  has_many :memberships, foreign_key: :member_id
  has_many :teams, through: :memberships
  has_many :in_follows, class_name: "Follow", foreign_key: :followee_id
  has_many :followers, through: :in_follows
  has_many :out_follows, class_name: "Follow", foreign_key: :follower_id
  has_many :followees, through: :out_follows
  has_many :authored_comments, class_name: "Comment", foreign_key: :author_id
  
  after_initialize :ensure_session_token

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end

  def generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.where('lower(username) = ?', username.downcase).first
    return if user.nil?
    user.is_password?(password) ? user : nil
  end

end

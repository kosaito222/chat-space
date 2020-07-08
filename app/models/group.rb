class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  # バリデーション presence:空でないこと、uniquness:一意
  validates :name, presence: true, uniqueness: true 
end

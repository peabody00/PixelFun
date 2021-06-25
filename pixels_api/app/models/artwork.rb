class Artwork < ApplicationRecord
    belongs_to :user
    validates :username, presence: true, uniqueness: true
end

class User < ApplicationRecord
    has_many :artworks
    validates :username, presence: true, uniqueness: true
end

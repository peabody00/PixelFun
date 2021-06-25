class CreateArtworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :name
      t.string :height
      t.string :width
      t.string :grid
      t.integer :user_id

      t.timestamps
    end
  end
end

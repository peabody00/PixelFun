class ArtworksController < ApplicationController
  before_action :set_artwork, only: [:show, :update, :destroy]

  # GET /artworks
  def index
    @artworks = Artwork.all

    render json: @artworks
  end

  # GET /artworks/1
  def show
    render json: @artwork
  end

  # POST /artworks
  def create
    @artwork = Artwork.new(artwork_params)

    if @artwork.save
      render json: @artwork, status: :created, location: @artwork
    else
      render json: @artwork.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /artworks/1
  def update
    if @artwork.update(artwork_params)
      render json: @artwork
    else
      render json: @artwork.errors, status: :unprocessable_entity
    end
  end

  # DELETE /artworks/1
  def destroy
    @artwork.destroy
    render json: @artwork
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_artwork
      @artwork = Artwork.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def artwork_params
      params.require(:artwork).permit(:name, :height, :width, :grid, :user_id)
    end
end

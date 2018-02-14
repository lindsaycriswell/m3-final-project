class Api::V1::DrinksController < ApplicationController

  def index
    @drinks = Drink.all
    render json: @drinks
  end

  def create
    @drink = Drink.new(drink_params)
    if @drink.save
      render json: @drink
    else
      render json: {errors: @drink.errors.full_messages}, status: 422
    end
  end

  def update
    @drink = Drink.find(params[:id])

    @drink.update(drink_params)
    if @drink.save
      render json: @drink
    else
      render json: {errors: @drink.errors.full_messages}, status: 422
    end
  end

  def destroy
    @drink = Drink.find(params[:id])
    @drink.destroy

    render json: @drink
  end

  def show
    render json: @drink, status: 200
  end


  private
  def drink_params
    params.permit(:name, :image_url, :description, :ingredient1, :ingredient2, :ingredient3, :ingredient4, :ingredient5, :garnish, :glass, :instructions)
  end


end

const { model, Schema } = require("mongoose");

const FoodReviewSchema = new Schema({
  reviewId: {
    type: String,
    required: true,
  },
  foodId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  isLiked: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const FoodReviewModel = model("foodReview", FoodReviewSchema);

module.exports.FoodReviewModel = FoodReviewModel;

module.exports.addFoodReview = ({ reviewId, foodId, isLiked, restaurantId }) =>
  FoodReviewModel.create({
    reviewId,
    foodId,
    isLiked,
    restaurantId,
  });

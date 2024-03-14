const { model, Schema } = require("mongoose");
const { FoodReviewModel } = require("./foodReview.model");
const ReviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  restaurantLiked: {
    type: Boolean,
    required: true,
  },
  waiterLiked: {
    type: Boolean,
    required: true,
  },
  deliveryLiked: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const ReviewModel = model("review", ReviewSchema);

module.exports = ReviewModel;

module.exports.getAllReviews = () => ReviewModel.find();

module.exports.getReviewById = (_id) =>
  ReviewModel.findById(_id).populate("foodReviews");

module.exports.updateReviewById = (_id) => ReviewModel.findByIdAndUpdate(_id);

module.exports.deleteReviewById = (_id) => ReviewModel.findByIdAndDelete(_id);

module.exports.addReview = ({
  userId,
  orderId,
  restaurantId,
  restaurantLiked,
  deliveryLiked,
  waiterLiked,
  foodReviews,
}) =>
  ReviewModel.create({
    userId,
    orderId,
    restaurantId,
    restaurantLiked,
    deliveryLiked,
    waiterLiked,
    foodReviews,
  });

module.exports.getReviewsByRestaurant = async (restaurantId) => {
  const totalRestaurantReviews = await ReviewModel.find({
    restaurantId: restaurantId,
  });

  const totalfoodReviewsOfRestaurant = await FoodReviewModel.find({
    restaurantId: restaurantId,
  });

  const totalRestaurantLikes = await ReviewModel.find({
    restaurantId: restaurantId,
    restaurantLiked: true,
  });

  const totalfoodLikes = await FoodReviewModel.find({
    restaurantId: restaurantId,
    isLiked: true,
  });

  const totalWaiterLikes = await ReviewModel.find({
    restaurantId: restaurantId,
    waiterLiked: true,
  });
  console.log(totalfoodLikes.length);
  console.log(totalRestaurantLikes.length);
  return (
    ((totalRestaurantLikes.length +
      totalfoodLikes.length +
      totalWaiterLikes.length) /
      (totalRestaurantReviews.length * 2 +
        totalfoodReviewsOfRestaurant.length)) *
    100
  ).toFixed(2);
};

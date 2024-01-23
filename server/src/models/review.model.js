const { model, Schema } = require("mongoose");
const { FoodReviewModel } = require("./foodReview.model");
const ReviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    // unique: true,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  chefId: {
    type: String,
  },
  waiterId: {
    type: String,
  },
  restaurantLiked: {
    type: Boolean,
    required: true,
  },
  chefLiked: {
    type: Boolean,
    required: true,
  },
  waiterLiked: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  /*foodReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "foodReview",
    },
  ],*/
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
  chefId,
  waiterId,
  restaurantLiked,
  chefLiked,
  waiterLiked,
  foodReviews,
}) =>
  ReviewModel.create({
    userId,
    orderId,
    restaurantId,
    chefId,
    waiterId,
    restaurantLiked,
    chefLiked,
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
  //const totalWaiterReviewsOfRestaurant =

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
  console.log(totalRestaurantLikes.length, )
  return (
    ((totalRestaurantLikes.length +
      totalfoodLikes.length +
      totalWaiterLikes.length) /
        (totalRestaurantReviews.length * 2 +
          totalfoodReviewsOfRestaurant.length)) * 100
    
  ).toFixed(2);
};

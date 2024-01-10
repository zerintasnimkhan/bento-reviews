const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  foodItemId: {
    type: String,
    required: true,
  },
  chefId: {
    type: String,
  },
  waiterId: {
    type: String,
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

const ReviewModel = model("review", ReviewSchema);

module.exports = ReviewModel;

module.exports.getAllReviews = () => ReviewModel.find();

module.exports.getReviewById = (_id) => ReviewModel.findById(_id);

module.exports.updateReviewById = (_id) => ReviewModel.findByIdAndUpdate(_id);

module.exports.deleteReviewById = (_id) => ReviewModel.findByIdAndDelete(_id);

module.exports.addReview = ({
  userId,
  orderId,
  restaurantId,
  foodItemId,
  isLiked,
}) =>
  ReviewModel.create({ userId, orderId, restaurantId, foodItemId, isLiked });

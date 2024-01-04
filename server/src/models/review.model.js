const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true,
    ref: "user",
  },
  orderId: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
  restaurantId: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
 foodItems: {
      type: [{ type: Schema.ObjectId, ref: "foodItems"}],
      required: true,
 },
  rating: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
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

module.exports. getReviewById = (_id) => ReviewModel.findById(_id);

module.exports. updateReviewById = (_id) => ReviewModel.findByIdAndUpdate(_id);

module.exports.deleteReviewById = (_id) => ReviewModel.findByIdAndDelete(_id);



module.exports.addReview = ({userId, comment, ratings, images}) =>

ReviewModel.create({userId, comment, ratings, images});


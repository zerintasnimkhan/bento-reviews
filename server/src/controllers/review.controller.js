const { addFoodReview } = require("../models/foodReview.model");
const {
  addReview,
  getAllReviews,
  getReviewById,
} = require("../models/review.model");

module.exports.createReview = async (req, res) => {
  try {
    const {
      userId,
      orderId,
      restaurantId,
      chefId,
      waiterId,
      foodReviews,
      waiterLiked,
      restaurantLiked,
      chefLiked,
    } = req.body;

    if (!userId || !orderId || !restaurantId || !foodReviews) {
      return res.status(400).json();
    }
    const reviewData = {
      userId,
      orderId,
      restaurantId,
      chefId,
      waiterId,
      waiterLiked,
      restaurantLiked,
      chefLiked,
    };

    console.log(reviewData);

    const savedReview = await addReview(reviewData);

    for (const foodReview of foodReviews) {
      const updatedFoodReview = {
        reviewId: savedReview.id,
        foodId: foodReview.foodId,
        isLiked: foodReview.isLiked,
      };
      console.log(updatedFoodReview);
      await addFoodReview(updatedFoodReview);
    }

    res.status(201).json({ message: "Review added", review: savedReview });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }

  async function addReviewedFood(foodReview) {
    await addFoodReview(foodReview);
  }
};

module.exports.fetchAllReviews = async (_req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

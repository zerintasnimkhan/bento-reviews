const { addFoodReview } = require("../models/foodReview.model");
const {
  addReview,
  getAllReviews,
  getReviewsByRestaurant,
} = require("../models/review.model");

module.exports.createReview = async (req, res) => {
  try {
    const {
      userId,
      orderId,
      restaurantId,
      foodReviews,
      waiterLiked,
      restaurantLiked,
      deliveryLiked,
    } = req.body;

    if (!userId || !orderId || !restaurantId || !foodReviews) {
      return res.status(400).json();
    }
    const reviewData = {
      userId,
      orderId,
      restaurantId,
      waiterLiked,
      restaurantLiked,
      deliveryLiked,
    };

    console.log(reviewData);

    const savedReview = await addReview(reviewData);

    for (const foodReview of foodReviews) {
      const updatedFoodReview = {
        reviewId: savedReview.id,
        restaurantId: restaurantId,
        foodId: foodReview.foodId,
        isLiked: foodReview.isLiked,
      };
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

module.exports.getReviewsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const reviews = await getReviewsByRestaurant(restaurantId);
    res.json(reviews);
  } catch (error) {
    res.send(error);
  }
};

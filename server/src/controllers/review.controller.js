const { addReview, getAllReviews } = require("../models/review.model");

module.exports.createReview = async (req, res) => {
  try {
    const {
      userId,
      orderId,
      restaurantId,
      chefId,
      waiterId,
      foods,
      isLiked,
    } = req.body;

    if (!userId || !orderId || !restaurantId || !foodItemId ) {
      return res.status(400).json();
    }
    const data = {
      userId,
      orderId,
      restaurantId,
      chefId,
      waiterId,
      isLiked,
    };

    console.log(data);


    const savedReview = await addReview(data);

    for (const food of foods) {
      const foodReview = {
        reviewId: savedReview.id,
        foodId: food.id,
        isLiked: food.isLiked,
      };
      await addReviewedFood(foodReview);
    }

    res.status(201).json({ message: "Review added", review: savedReview });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
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

const router = require("express").Router();

const reviewController = require("../controllers/review.controller");
//const authMiddleware = require("../middlewares/auth");

router.post("/add", reviewController.createReview);
router.get("/fetch", reviewController.fetchAllReviews);
router.get("/restaurant/:id", reviewController.getReviewsByRestaurant)

module.exports = router;
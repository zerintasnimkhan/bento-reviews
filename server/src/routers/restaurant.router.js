const router = require("express").Router();

const restaurantController = require("../controllers/restaurant.controller");
const authMiddleware = require("../middlewares/auth");
const restaurantMiddleware = require("../middlewares/restaurant.middleware");

router.post("/add", restaurantController.createRestaurant);
router.get("/all", restaurantController.fetchAllRestaurants);
router.get("/fetch/:id", restaurantController.fetchRestaurantById);
router.get("/owner", authMiddleware, restaurantMiddleware, restaurantController.fetchRestaurantByOwnerId);
router.put("/edit/:id", authMiddleware, restaurantMiddleware, restaurantController.updateRestaurantById);


module.exports = router;

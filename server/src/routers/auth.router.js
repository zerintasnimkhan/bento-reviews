const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/registerRestaurant", userController.registerRestaurant);
router.get("/auth/user", authMiddleware, userController.getAuthUserInfo);

module.exports = router;



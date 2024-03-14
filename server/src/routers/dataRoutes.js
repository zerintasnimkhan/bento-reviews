const express = require("express");
const dataController = require("../controllers/dataController");
const router = express.Router();

router.get("/marketPlace/:orderId", dataController.fetchOrderDetailsFromMarketPlace);
router.get("/pos/:orderId", dataController.fetchOrderDetailsFromPos);

module.exports = router;

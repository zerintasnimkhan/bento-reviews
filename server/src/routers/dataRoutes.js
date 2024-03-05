const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/fetch-data', dataController.fetchOrderDetailsFromMarketPlace);

module.exports = router;

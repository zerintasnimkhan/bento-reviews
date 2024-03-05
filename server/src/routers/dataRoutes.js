const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/marketPlace', dataController.fetchOrderDetailsFromMarketPlace);
//router.get('/pos', dataController.fetchOrderDetailsFromPos);

module.exports = router;

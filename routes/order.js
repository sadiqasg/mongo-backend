const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const orderCtrl = require('../controllers/order');

router.get('/', orderCtrl.getOrders);

module.exports = router;

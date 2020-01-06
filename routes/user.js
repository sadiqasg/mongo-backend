const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signUp);
router.post('/login', userCtrl.login);
router.get('/getUsers', userCtrl.getUsers);

module.exports = router;

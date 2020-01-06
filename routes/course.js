const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const verifyPayment = require('../middleware/verifyPayment');
// const multer = require('../middleware/multer-config');

const courseCtrl = require('../controllers/course');

router.get('/', auth, courseCtrl.getAllCourses);
router.get('/:id', auth, courseCtrl.getSingleCourse);

// router.post('/', auth, multer, courseCtrl.createThing);
// router.put('/:id', auth, multer, courseCtrl.modifyThing);
// router.delete('/:id', auth, courseCtrl.deleteThing);

module.exports = router;

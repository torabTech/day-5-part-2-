const express = require('express');
const router = express.Router({mergeParams:true});


const controller = require('../controller/courseController');

router.route('/').get(controller.getAll);
router.route('/:cid').get(controller.getOne);

module.exports = router;
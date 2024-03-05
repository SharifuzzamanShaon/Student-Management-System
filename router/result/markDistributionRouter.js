const { addMarkController } = require('../../controller/result/markDistributionController');

const router = require('express').Router();

router.put("/:semester/:courseCode/:credit/:studentId", addMarkController);


module.exports = router
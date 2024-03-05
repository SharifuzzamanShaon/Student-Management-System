const { getGpaByStudentId } = require('../../controller/result/gpaController');

const router = require('express').Router();

router.get("/:semester/:studentId", getGpaByStudentId);


module.exports = router
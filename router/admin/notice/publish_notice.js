const { createNotice } = require('../../../controller/admin-activity/noticeController');

const router = require('express').Router();


router.post("/create-notice", createNotice)


module.exports = router
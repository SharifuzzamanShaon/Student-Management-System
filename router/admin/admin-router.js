const router = require('express').Router();
const noticeRoute =require('./notice/publish_notice')

router.use("/notice", noticeRoute)

module.exports = router;
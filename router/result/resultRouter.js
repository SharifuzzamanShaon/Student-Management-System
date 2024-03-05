const router = require('express').Router()
const markDistribution = require('./markDistributionRouter')
const gpaRouter = require('./gpaRouter')

router.use("/add-mark", markDistribution)
router.use("/get-gpa", gpaRouter)
module.exports = router
const router = require('express').Router()
const authRouter = require("./auth/auth")
const userRouter = require('./users')
const adminAttendance = require("./attendance/adminAttendance")
const authMiddleware = require('../middleware/auth')
const studentAttenadance = require('./attendance/studentAttenadance')
const courseRouter = require('./course/courseRouter')
const resultRouter = require('./result/resultRouter')


router.use("/api/v1/auth", authRouter)
router.use("/api/v1/users", userRouter)
router.use("/api/v1/adminAttendance", adminAttendance)
router.use("/api/v1/studentAttenadance", authMiddleware, studentAttenadance)
router.use("/api/v1/course", courseRouter)
router.use("/api/v1/result",resultRouter)
module.exports = router
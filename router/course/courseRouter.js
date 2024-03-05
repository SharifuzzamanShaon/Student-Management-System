const { addCourseController, viewCourseById } = require('../../controller/course/courseController')

const router = require('express').Router()

router.get('/get-course/:id', viewCourseById)
router.post('/add-course',addCourseController)

module.exports = router
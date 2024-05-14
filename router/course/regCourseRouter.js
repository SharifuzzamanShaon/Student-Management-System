const { regCourseByStudent, regToNewCourse } = require('../../controller/course/courseController')

const router = require('express').Router()


router.get("/get-registered-courses/:studentId",regCourseByStudent)
router.post("/reg-to-new-course/:courseId/:studentId", regToNewCourse)

module.exports = router
const { addCourseController, viewCourseById } = require('../../controller/course/courseController')
const { upload } = require('../../middleware/fileUploader')

const router = require('express').Router()

router.get('/get-course/:id', viewCourseById)
router.post('/add-course', upload.single('excelFile'),addCourseController)

module.exports = router
const course = require("../../model/course")
const { findCourseByProperty, addNewCourse } = require("../../services/course")
const { error } = require("../../utils/error")

const viewCourseById = async (req, res, next) => {

    try {
        const { id } = req.params
        const courseExist =await course.findById({'_id':id}).populate({ path: 'regStudents', options: { strictPopulate: false } }) 
        return res.status(200).send({courseInfo: courseExist})
    } catch (error) {
        next(error)
    }
}
const addCourseController = async (req, res, next) => {
    try {
        const { name, courseCode, credit, totalCapacity,
            classDuration, faculty, regStudents } = req.body
        const isCourseEixsts = await findCourseByProperty('courseCode', courseCode)
        if (isCourseEixsts) {
            throw error('course exists', 409)
        }
        const newCourse = await addNewCourse({
            name, courseCode, credit, totalCapacity,
            classDuration, faculty, regStudents
        })
        return res.status(201).send({ message: 'new course created', newCourse })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCourseController,
    viewCourseById
}
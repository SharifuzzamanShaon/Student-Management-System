const course = require("../../model/course")
const { addNewCourse, insertCourseArr } = require("../../services/course");
const { error } = require("../../utils/error");
const { convertExcetToJsonData } = require("../../utils/excelToJsonconvertor");
const { findDuplicateCourseItem } = require("../../utils/filterCourseData");

const viewCourseById = async (req, res, next) => {

    try {
        const { id } = req.params
        const courseExist = await course.findById({ '_id': id }).populate({ path: 'regStudents', options: { strictPopulate: false } })
        return res.status(200).send({ courseInfo: courseExist })
    } catch (error) {
        next(error)
    }
}
const addCourseController = async (req, res, next) => {
    try {
        let courses;
        if (req) {
            if (req.file) {
                const file = req.file
                courses = await convertExcetToJsonData(file)
            } else {
                courses = req.body;
            }
            if (courses) {
                await findDuplicateCourseItem(courses)
                if (courses.length == 1) {
                    const { name, courseCode, credit, totalCapacity, classDuration, faculty, regStudents } = courses[0]
                    const newCourse = await addNewCourse({ name, courseCode, credit, totalCapacity, classDuration, faculty, regStudents })
                    return res.status(201).send({ message: 'new course created', newCourse })
                }
                const newCourses = await insertCourseArr(courses)
                return res.status(201).send({ message: `new ${courses.length} courses created`, newCourses })
            } else {
                throw error('please insert course', 404)
            }
        }

    } catch (err) {
        next(err)
    }
}


const regCourseByStudent = async (req, res, next) => {
    try {
        const id = req.params.studentId
        console.log(id);
        const registeredCourses = await course.find({ 'regStudents': id })
        return res.status(200).send({ 'registeredCourses': registeredCourses });
    } catch (error) {
        next(error)
    }
}
const regToNewCourse = async (req, res, next) => {

    try {
        console.log(req.params.courseId);
        const registeredCourses = await course.find({ "regStudents": req.params.studentId });
        if (registeredCourses) {
            const totalCreditTaken = registeredCourses.reduce((acc, cur) => acc + cur.credit, 0);
            if (totalCreditTaken >= 11) {
                throw error(`Already taken ${totalCreditTaken}, can not take more than 11 credit`, 403);
            }
        }
        console.log(registeredCourses);
        const isAlredyRegistered =  registeredCourses.some(course => 
            course._id.equals(req.params.courseId) && course.regStudents.includes(req.params.studentId)
        );
        console.log(isAlredyRegistered);
        if (!isAlredyRegistered) {
            const respose = await course.findByIdAndUpdate(req.params.courseId, { $push: { regStudents: req.params.studentId } }, { new: true })
            return res.status(200).send({ message: "success", 'respose': respose });
        }
        else {
            throw error('already registared', 409);
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCourseController,
    viewCourseById,
    regCourseByStudent,
    regToNewCourse
}
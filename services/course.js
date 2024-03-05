const course = require("../model/course")

const findCourseByProperty = (key, value) => {
    if (key === "_id") {
        return course.findById(value);
    }
    return course.findOne({ [key]: value }) //it means that the key of the object is dynamic and determined by the value of the key variable.
}

const addNewCourse = ({ name, courseCode, credit, totalCapacity,
    classDuration, faculty, regStudents }) => {
    const newCourse = new course({
        name, courseCode, credit, totalCapacity,
        classDuration, faculty, regStudents
    })
    return newCourse.save();
}
module.exports = {
    findCourseByProperty, addNewCourse
}
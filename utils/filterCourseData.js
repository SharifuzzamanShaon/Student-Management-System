const course = require("../model/course");
const { error } = require("./error");

const findDuplicateCourseItem = async (courses) => {
    const conflitCoursesOnFile = courses.filter((item, index) => courses.findIndex((obj) => obj.courseCode === item.courseCode) !== index)
    console.log("conflict", conflitCoursesOnFile);
    if (conflitCoursesOnFile.length > 0) {
        console.log("conflict", conflitCoursesOnFile);
        const confilctCourses = conflitCoursesOnFile.map(course => `${course.courseCode} serial no:${course.sl}`);
        throw error(`Course ${confilctCourses} are duplicate`, 409)
    }
    // Check on DB if any course alreay reg. 
    const existingCourses = await course.distinct('courseCode')
    const duplicateCourses = courses.filter((item) => existingCourses.includes(item.courseCode))
    console.log(duplicateCourses);
    if (duplicateCourses.length > 0) {
        const confilctCourses = duplicateCourses.map((item) => item.courseCode)
        throw error(`${confilctCourses} alredy exists`, 409)
    }
}

module.exports = {findDuplicateCourseItem}
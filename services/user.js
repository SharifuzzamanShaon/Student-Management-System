const User = require("../model/User")
const error = require("../utils/error")


function addNewUser({ username, email, password, role, studentInfo, facultyInfo, adminInfo }) {
    const newUser = new User({
        username,
        email,
        password,
        role: role,
        ...(studentInfo && {
            studentInfo: {
                studentId: studentInfo.studentId,
                fullName: studentInfo.fullName,
                currentSemester: studentInfo.currentSemester,
                department: studentInfo.department,
                // regCourse: [studentInfo.regCourse],
                courseCredit: {
                    completed: studentInfo.courseCredit.completed,
                    required: studentInfo.courseCredit.required
                }
            }
        }),
        ...(facultyInfo && {
            facultyInfo: {
                facultyId: facultyInfo.facultyId,
                department: facultyInfo.department,
                assigneCourses: facultyInfo.assigneCourses
            }
        })
        // admin_info: { ...admin_info }

    })
    return newUser.save()
}

const putUserById = async (id, data) => {
    const emailExists = await findUserByProperty("email", data.email)
    if (emailExists) throw error('Email alreadt in use', 404)
    return User.findByIdAndUpdate(id, { ...data }, { new: true })
}
const findUserByProperty = (key, value) => {

    if (key === '_id') {
        return User.findById(value);
    }
    return User.findOne({ [key]: value })
}

function getUsers() {
    return User.find()
}

function deleteUser(key, value) {
    return User.findOneAndRemove({ [key]: value })
}

module.exports = {
    addNewUser,
    putUserById,
    findUserByProperty,
    getUsers,
    deleteUser
}
const { default: mongoose, Schema } = require("mongoose");

const studentInfoSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    currentSemester: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    regCourse: [
        {
            type: Schema.Types.ObjectId,
            ref: "course"
        }
    ],
    // result: {
    //     type: Schema.Types.ObjectId,
    //     ref: "result"
    // },
    // cgpa:{
    //     type: Number
    // },
    courseCredit: {
        completed: { type: Number },
        required: { type: Number }
    }
})

const facultySchema = new mongoose.Schema({
    facultyId: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    assigneCourses: {
        type: [Schema.Types.ObjectId],
        required: true
    }
})

module.exports = { studentInfoSchema, facultySchema }
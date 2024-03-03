const { mongoose, Schema } = require("mongoose");
const { schema } = require("./studentAttendance");
const { studentInfoSchema, facultySchema } = require("./rolebased_schema");



const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    role: {
        type: String,
        enum: ['STUDENT', 'ADMIN', 'FACULTY', 'ACCOUNTENT'],
        required: true
    },
    studentInfo: {
        type: studentInfoSchema, // or specify detailed schema for student_info
        required: function () {
            return this.roles ==='STUDENT'
        }
    },
    facultyInfo: {
        type: facultySchema,
        required: function () {
            return this.roles === "FACULTY";
        }
    }
})



const User = mongoose.model("User", userSchema)

module.exports = User
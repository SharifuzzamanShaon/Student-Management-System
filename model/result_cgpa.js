const { default: mongoose, Schema } = require("mongoose");

const Result_cgpa = new mongoose.Schema({

    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    cgpa: {
        type: Number,
        required
    }
})

const result_cgpa = mongoose.model('result_cgpa', Result_cgpa)


module.exports = result_cgpa
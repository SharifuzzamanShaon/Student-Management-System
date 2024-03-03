const { default: mongoose, Schema } = require("mongoose");

const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        enum: [1, 3],
        required: true
    },
    total_capacity: {
        type: Number
    },
    class_duration:{
        type:String,
        enum: ['1h', '2h']
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "faculty"
    }
})


const course = mongoose.model('course', Course)

module.exports = course
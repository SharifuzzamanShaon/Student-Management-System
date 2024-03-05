const { default: mongoose, Schema } = require("mongoose");

const Course = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    credit: {
        type: Number,
        enum: [1, 3],
        required: true
    },
    totalCapacity: {
        type: Number
    },
    classDuration: {
        type: String,
        enum: ['1h', '2h']
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "faculty"
    },
    regStudents: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        validate: {
            validator: function (arr) {
                return arr.length <= this.totalCapacity
            },
            message: ` exceeds the maximum capacity`
        }
    }
})


const course = mongoose.model('course', Course)

module.exports = course
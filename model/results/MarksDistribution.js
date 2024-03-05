const { default: mongoose, Schema } = require("mongoose");

const MarksDistributionSchema = new mongoose.Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    semester: {
        type: Number
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
    midExamMark: {
        type: Number,
        max: [30, 'max value 30']
    },
    finalExamMark: {
        type: Number,
        max: [40, 'max value 40']
    },
    classTest: {
        type: Number,
        max: [20, 'max value 20']
    },
    quizTest: {
        type: Number,
        max: [5, 'max value 5']
    },
    attendance: {
        type: Number,
        max: [5, 'max value 5']
    }
})

const MarksDistribution = mongoose.model('marksDirstribution', MarksDistributionSchema);

module.exports = MarksDistribution
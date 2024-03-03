const { default: mongoose, Mongoose, Schema } = require("mongoose");

const Faculty = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    assigned_courses: {
        type: Schema.Types.ObjectId,
        ref: "course"
    }
})

const faculty = mongoose.model('faculty', Faculty)

module.exports = faculty;

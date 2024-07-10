const { default: mongoose } = require("mongoose");

const noticeSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,

    },
    publish_date: {
        type: Date,
        default: Date.now
    },
    referance: {
        type: String
    },
    description: {
        type: String
    },
    copy_for_action: {
        type: String
    },
    for_information: {
        type: String
    },
    status: {
        type: String,
        enum: ['Draft', 'Pending', 'Published', 'Archived', 'Cancelled'],
        required: true
    }
}, { timestamp: true })


let currentSerialNumber = 1;

noticeSchema.pre('save', function (next) {
    currentSerialNumber = (currentSerialNumber % 9999) + 1;

    const sl = String(currentSerialNumber).padStart(4, '0');
    const date = new Date()
    const year = date.getFullYear();
    this.referance = `SMS/NOTICE/${sl}/${year}`;
    next();
})


const notice = mongoose.model('notice', noticeSchema)

module.exports = notice
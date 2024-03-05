const MarksDistribution = require("../../model/results/MarksDistribution")
const { gradePointConvarter } = require("../../utils/convartGPA")

const getGpaByStudentId = async (req, res, next) => {
    try {
        const { semester, studentId } = req.params
        const marksBySemester = await MarksDistribution.find({ studentId, semester })
        const response = gradePointConvarter(marksBySemester)
        return res.status(200).send(response)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getGpaByStudentId
}

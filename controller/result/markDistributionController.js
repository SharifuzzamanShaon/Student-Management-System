const MarksDistribution = require("../../model/results/MarksDistribution");

const addMarkController = async (req, res, next) => {

    try {
        const { semester, courseCode, credit, studentId } = req.params;
        const { midExamMark, finalExamMark, classTest, quizTest, attendance } = req.body
        const markExists = await MarksDistribution.findOne({ studentId,courseCode })
        if (markExists) {
            markExists.midExamMark = midExamMark ?? markExists.midExamMark;
            markExists.finalExamMark = finalExamMark ?? markExists.finalExamMark;
            markExists.classTest = classTest ?? markExists.classTest;
            markExists.quizTest = quizTest ?? markExists.quizTest;
            markExists.attendance = attendance ?? markExists.attendance
            await markExists.save();
            return res.status(200).send(markExists)
        }

        const newMrakDistribute = new MarksDistribution({
            semester, courseCode, credit, studentId
        })
        if (newMrakDistribute) {
            newMrakDistribute.midExamMark = midExamMark ?? newMrakDistribute.midExamMark;
            newMrakDistribute.finalExamMark = finalExamMark ?? newMrakDistribute.finalExamMark;
            newMrakDistribute.classTest = classTest ?? newMrakDistribute.classTest;
            newMrakDistribute.quizTest = quizTest ?? newMrakDistribute.quizTest;
            newMrakDistribute.attendance = attendance ?? newMrakDistribute.attendance

            await newMrakDistribute.save();
            return res.status(200).send(newMrakDistribute)
        }
    } catch (error) {
        next(error)
    }

}

module.exports = {
    addMarkController
}
 const gradePointConvarter = (marksBySemester) => {
    let gradePointandCredit = marksBySemester.map((item) => {
        const { midExamMark, finalExamMark, quizTest, classTest, attendance } = item;
        const totalMarks = midExamMark + finalExamMark + quizTest + classTest + attendance
        let gradePoint = 0;
        let letter = "";

        const totalMarkRange = [80, 75, 70, 65, 60, 55, 50, 45, 40, 0];
        const gradePoints = [4.00, 3.75, 3.75, 3.50, 3.00, 2.75, 2.50, 2.25, 2.00, 0.00];
        const letters = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

        for (let i = 0; i < totalMarkRange.length; i++) {
            if (totalMarks >= totalMarkRange[i]) {
                gradePoint = gradePoints[i];
                letter = letters[i];
                break;
            }
        }
        gradePoint = gradePoint * item.credit
        return { course: item.courseCode, letterGrade: letter, gradePoint, totalCredit: item.credit }
    })
    const calculateGPA = (gradePointandCredit) => {
        let gpaResult = 0;
        const totalGradePoint = gradePointandCredit.reduce((acc, curr) => acc + curr.gradePoint, 0)
        const totalCredit = gradePointandCredit.reduce((acc, curr) => acc + curr.totalCredit, 0)
        gpaResult = totalGradePoint / totalCredit;
        return gpaResult.toFixed(2);
    }

    const gpaPerSemester = calculateGPA(gradePointandCredit);
    const resultBySemesterGPA = {
        courseResult: gradePointandCredit,
        semesterGPA: gpaPerSemester
    }
    return resultBySemesterGPA
}

module.exports = {gradePointConvarter}
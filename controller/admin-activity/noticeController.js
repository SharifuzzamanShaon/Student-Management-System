const notice = require("../../model/notice")

const createNotice = async (req, res, next) => {
    try {

        const { subject, description, copy_for_action, for_information, status } = req.body
        const createNetNotice = new notice({
            subject, description, copy_for_action, for_information, status
        })
        const newNotice = await createNetNotice.save();
        return res.status(200).send({ "Notice : ": newNotice });
    } catch (error) {
        next(error)

    }

}


module.exports = {
    createNotice
}
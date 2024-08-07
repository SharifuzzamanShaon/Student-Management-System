
const { registerService, loginService } = require('../services/authServices');


const registerController = async (req, res, next) => {
    try {
        const { username, email, password, role, studentInfo, facultyInfo, adminInfo } = req.body
        const newUser = await registerService({ username, email, password, role, studentInfo, facultyInfo, adminInfo })
        return res.status(200).send({ message: 'New user created', newUser })
    } catch (error) {
        next(error)
    }
}

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const token = await loginService({ email, password })
        return res.status(200).send({ message: 'Login Success', token })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    registerController, loginController
}
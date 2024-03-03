const { authorizationError } = require("../utils/error");

const authorize = (roles = ['FACULTY']) => (req, res, next) => {
    if (roles.includes(req.user.roles)) {
        return next();
    } else {
        return next(authorizationError())
    }
}

module.exports = authorize
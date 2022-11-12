const createError = require('http-errors')

const verify = (permission) => {
    return (req, res, next) => {
        const userRole = req.payload.roles
        if (permission.includes(userRole)) {
            next()
        } else {
            return next(createError(401, "You are not allowed to access this page"))
        }
    }
}

module.exports = {
    verify
}
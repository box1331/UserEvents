const ApiError = require('../helpers/apiErrors')

module.exports = function(err, req, res, next) {
    if (err instanceof ApiError) {
        console.log(err);
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }

    return res.status(500).json({message: 'Something error ... ', errors: err.message})
}
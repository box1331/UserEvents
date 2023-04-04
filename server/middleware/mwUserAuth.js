const jwt = require('jsonwebtoken')
const {secret} = require('../config')
const ApiError = require('../helpers/apiErrors')


module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
   
    try {
        const token = req.headers.authorization
        // console.log(token)
        if (!token) {
            return next(ApiError.UnauthorizedError())
        }
    
        // Розшифровуємо токен: decodedData = payload
        const decodedData = jwt.verify(token, secret)
        if (!decodedData) {
            return next(ApiError.UnauthorizedError())
        }

        next()

    } catch (err) {
        next(err)
        
    }
}



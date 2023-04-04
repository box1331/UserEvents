const ApiError = require('../helpers/apiErrors');
const UsersModel = require('../models/UsersModel');

module.exports = async function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        const candidate = req.body;
        const user = await UsersModel.findOne({userName: candidate.userName});
        if (user) {
            return next(ApiError.BadRequest(
                `User name ${candidate.userName} is already!`, 
                (`User name ${candidate.userName} is already!`)
            ));
        }
        next()
    } catch (err) {
        next(err);
    }
}


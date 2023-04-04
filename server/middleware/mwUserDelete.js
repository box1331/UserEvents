const ApiError = require('../helpers/apiErrors');
const UsersEventsModel = require('../models/UsersEventsModel');

module.exports = async function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        const user = req.query.userName;
        const userTask = await UsersEventsModel.findOne({userName: user});
        
        if (userTask) {
            return next(ApiError.BadRequest(`Deletion is not possible! User ${userTask.userName} has open tasks ...`, (`Deletion is not possible! User "${userTask.userName}" has open tasks ...`)));
        }
        
        next()
    } catch (err) {
        next(err);
    }
}


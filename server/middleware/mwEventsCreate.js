const ApiError = require('../helpers/apiErrors');
const UsersEventsModel = require('../models/UsersEventsModel');

module.exports = async function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        const candidate = req.body;
        const startEvent = await UsersEventsModel.find({startDate: candidate.startDate, userName: candidate.userName});
           
        if (startEvent.length !== 0) {
            return next(ApiError.BadRequest(
                `You can't create an event at this time. This time ${candidate.startDate} is already!`
            ));
        }
    
        next()
        
    } catch (err) {
        next(err);
    }
}


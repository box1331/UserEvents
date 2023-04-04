const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');

module.exports = async function(req, res, next) {
    if (req.method == 'OPTIONS') {
        next();
    }

    try {
        const candidate = req.body;

        //Field Title
        if (candidate.title.length < 4 || candidate.title.length > 16) {
            return next(ApiError.BadRequest(`Error filling out the field Title ... `, (`Field Title must be min: 4 and max: 16 words!`)));
        }       
       
        //Field Description
        if (candidate.description.length < 8 || candidate.description.length > 32) {
            return next(ApiError.BadRequest(`Error filling out the field Description ... `, (`Field Description must be min: 8 and max: 32 words!`)));
        }       

        //Field StartDate
        // if (new Date(candidate.startDate).toLocaleDateString() <= new Date().toLocaleDateString()) {
        if (new Date(candidate.startDate).getTime() <= new Date().getTime()) {
            return next(ApiError.BadRequest(`Error filling out the field StartDate ... `, (`Field StartDate must be greater than ${new Date().toLocaleDateString()}!`)));
        }    
        
        //Field EndDate
        if (candidate.endDate <= candidate.startDate) {
            return next(ApiError.BadRequest(`Error filling out the field EndDate ... `, (`Field EndDate must be greater than ${new Date(candidate.startDate).toLocaleDateString()}!`)));
        } 

        next()

    } catch (err) {
        logger.error({message: err.message});
        next(err);
    }
}


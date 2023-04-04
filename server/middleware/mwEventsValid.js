const { body, check } = require('express-validator')

const eventValid = [
    body('userName')
        .isLength({ min: 4, max: 12 })
        .withMessage('Fieald UserName must be min: 4 and max: 12 words ... '),
    body('title')
        .isLength({ min: 4, max: 24 })
        .withMessage('Fieald Title must be min: 4 and max: 12 words ... '),  
    body('description')
        .isLength({ min: 4, max: 32 })
        .withMessage('Fieald Description must be min: 4 and max: 12 words ... '),  
    check('startDate')
        .toDate(),
    check('endDate')
        .toDate()
    ]

    
module.exports = { eventValid }
const { body } = require('express-validator');

const userValid = [
    body('userName')
        .isLength({min: 4, max: 12})
        .withMessage('Fieald UserName must be min: 4 and max: 12 words ... '),
    body('surName')
        .isLength({min: 4, max: 12})
        .withMessage('Fieald SurName must be min: 4 and max: 12 words ... '),
    body('email')
        .isEmail()
        .withMessage('Fieald Email can`t empty'), 
    body('phoneNumber')
        .exists()
        .isLength({min: 10, max: 10})
        .withMessage('Fieald PhoneNumber must be 10 symbols ... ')
];

module.exports = { userValid }



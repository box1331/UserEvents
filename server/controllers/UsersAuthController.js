const {validationResult} = require('express-validator');
const AuthService = require('../services/AuthService');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


class Controller {

    //Registration
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Error during registration ...', errors});
            }

            const {firstName, lastName, email, password, passwordConfirm} = req.body;   
            const user = await AuthService.registration(firstName, lastName, email, password, passwordConfirm);


            logger.info(`Controller: User ${user.email} is successfully registered ...`);
            return res.json({message: `User ${user.email} is successfully registered ...`});
            
        } catch (err) {
            logger.error({message: err.message, stack: err.stack});
            next(err)
        }
    }

    //Login
    async login(req, res, next) {
        try {

            //Validation user
            const {email, password} = req.body;
            const user = await AuthService.login(email, password);
                       
            if (user.token) {
                logger.info(`Controller: User ${user.user.email} connect successfuly ... `);
            }      

            res.json(user);       

        } catch (err) {
            logger.error({message: err.message, stack: err.stack});
            next(err);
        }
    }

    //Users
    async getUsers(req, res, next) {
        try {
            if (req.headers.authorization == undefined) {
                throw ApiError.UnauthorizedError();
            }
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.headers.authorization;
            
            if (!token) {
                throw ApiError.UnauthorizedError();
            }

            const user = await AuthService.getUsers(token);
            
            return res.status(200).send(user)

        } catch (err) {
            // res.status(403).json({message: 'User is not authorized ...'});
            logger.error({message: err.message, stack: err.stack});
            next(err);
        }
    }

};

module.exports = new Controller();
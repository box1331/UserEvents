const {validationResult} = require('express-validator');
const UserService = require('../services/UserService');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


class UserController {
    
    async get(req, res, next) {
        try {
            const id = req.params.id;
            const user = await UserService.get(id);

            return res.status(200).send(user)
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {                      
            //Pagination
            const page = parseInt(req.query.page)
            // Sort
            const { sort } = req.query
            const usersPaginAndSort = await UserService.getAll(page, sort);
            return res.status(200).json(usersPaginAndSort);
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
            next(error)
        }
    }

    async getInfoAll(req, res, next) {
        try {                      
            //Pagination
            const pageInfo = parseInt(req.query.pageInfo)
            // Sort
            const { sort } = req.query
            
            const usersPaginAndSortAll = await UserService.getInfoAll(pageInfo, sort);
            
            return res.status(200).json(usersPaginAndSortAll);
        } catch(error) { 
            logger.error({message: err.message, stack: err.stack});
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            // Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errorValidation.array()));
            }

            const userAll = {...req.body}
            
            const newUser = await UserService.create(userAll);

            logger.info(`Controller: User create ${newUser} ...`);
            return res.status(200).json(newUser);
        } catch(error) {
            logger.error({message: error.message, stack: error.stack});
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            //Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errorValidation.array()));
            }

            const id = req.params.id;
            const body = req.body;
            const param = {new: true};

            const user = await UserService.update(id, body, param);
            logger.info(`Controller: User ${id} update ${user} ...`);
            return res.status(200).send(user);
        } catch(error) {
            logger.error({message: error.message, stack: error.stack});
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const objDelete = await UserService.delete(id);
            logger.info(`Controller: User ${id} delete ...`);
            return res.status(200).json(objDelete);
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
            next(error)
        }
    }
}

module.exports = new UserController();

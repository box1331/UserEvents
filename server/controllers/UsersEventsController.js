const {validationResult} = require('express-validator');
const EventService = require('../services/EventService');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


class UsersEventsControllers {

    async get(req, res, next) {
        try {
            const id = req.params.id;
            const event = await EventService.get(id);
            return res.status(200).json(event)
        } catch(error) {
            logger.error({message: error.message});
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            //Paginstion
            const page = parseInt(req.query.page)
            // Sort
            const { sort } = req.query
            
            const usersPaginAndSort = await EventService.getAll(page, sort);

            return res.status(200).json(usersPaginAndSort);
    
        } catch(error) {
            logger.error({message: error.message});
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            //Express-Validator
            const errorValidation = validationResult(req);
            if (!errorValidation.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errorValidation.array()));
            }

            const eventAll = {...req.body};

            const newEvent = await EventService.create(eventAll);

            logger.info(`Controller: Event create ${newEvent} ...`);
            return res.status(200).send(newEvent)
    
        } catch(error) {
            logger.error({message: error.message});
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
            const body = {...req.body};
            const param = {new: true};

            const event = await EventService.update(id, body, param);
            logger.info(`Controller: Event id = ${id} update ${event} ...`);
            return res.status(200).send(event);
        } catch(error) {
            logger.error({message: error.message});
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const objDelete = await EventService.delete(id);
            logger.info(`Controller: Event id = ${id} delete ...`);
            return res.status(200).json(objDelete);
        } catch(error) {
            logger.error({message: error.message});
            next(error)
        }
    }
}

module.exports = new UsersEventsControllers();
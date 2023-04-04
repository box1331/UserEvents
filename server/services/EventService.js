
const UsersEventsModel = require('../models/UsersEventsModel');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


class EventService {
    async get(id) {
        try {
            const event = await UsersEventsModel.findById(id)
            return event;
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async getAll(page, sort) {
        try {
            //Paginstion
            const limit = 10
            const skip = (page - 1) * limit
            const eventsTotal = await UsersEventsModel.find()
            const pageTotal = Math.ceil(eventsTotal.length / limit)

            // Sort
            let events

            switch(sort) {
                case 'userName':
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'title':
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({title: 1})
                    break
                case 'description':
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({description: 1})
                    break
                case 'startDate':
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({startDate: 1})
                    break
                case 'endDate':
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({endDate: 1})
                    break
                default: 
                    events = await UsersEventsModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }

            return {events, pageTotal};
    
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async create(eventAll) {
        try {
            const event = new UsersEventsModel(eventAll);
            const newEvent = event.save()
            logger.info(`Service: Event create ${event} ...`);
            return newEvent;
    
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async update(id, body, param) {
        try {
            const event = await UsersEventsModel.findByIdAndUpdate(id, body, param)
            logger.info(`Service: Event id = ${id} update ${event} ...`);
            return event;
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async delete(id) {
        try {
            await UsersEventsModel.findByIdAndDelete(id)
            logger.info(`Service: Event id = ${id} delete ...`);
            return ({status: 'OK', message: 'Item is delete ... '});
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }
}

module.exports = new EventService();
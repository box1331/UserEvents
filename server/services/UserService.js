const UsersModel = require('../models/UsersModel');
const UsersEventsModel = require('../models/UsersEventsModel');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


class UserService {

    async get(id) {
        try {
            const user = await UsersModel.findById(id)
            return user;
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async getAll(page, sort) {
        try {                      
            //Pagination
            const limit = 5
            const skip = (page - 1) * limit
            const usersTotal = await UsersModel.find()
            const pageTotal = Math.ceil(usersTotal.length / limit)
            
            // Sort
            let users
            switch(sort) {
                case 'userName': 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'surName': 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({surName: 1})
                    break
                case 'email':
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({email: 1})
                    break
                case 'phoneNumber':
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({phoneNumber: 1})
                    break
                default: 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }         
            return {users, pageTotal};
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async getInfoAll(pageInfo, sort) {
        try {                      
            //Pagination
            const limit = 5
            const skip = (pageInfo - 1) * limit
            const usersTotal = await UsersModel.find()
            const pageTotalInfo = Math.ceil(usersTotal.length / limit)
            
            // Sort
            let users

            switch(sort) {
                case 'userName': 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
                case 'email': 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({email: 1})
                    break
                case 'phoneNumber':
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({phoneNumber: 1})
                    break
                default: 
                    users = await UsersModel
                        .find({})
                        .skip(skip)
                        .limit(limit)
                        .sort({userName: 1})
                    break
            }  
            
            //Indicators countTask
            const countTask = await UsersEventsModel.aggregate([
                {
                    $group: {
                        _id: '$userName',
                        countTask: { $sum: 1 }
                    }
                }
            ]);

            //Indicators dateNextEvent
            const dateNextEvent = await UsersEventsModel.aggregate([
                {
                    $group: {
                        _id: '$userName',
                        startDate: { $min: '$startDate' }
                    }
                }
            ]);

            return {users, dateNextEvent, countTask, pageTotalInfo};
        } catch(error) { 
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async create(userAll) {
        try {
            const user = await new UsersModel(userAll);
            const newUser = user.save()
            logger.info(`Service: User create ${user} ...`);
            return newUser;
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async update(id, body, param) {
        try {
            const user = await UsersModel.findByIdAndUpdate(id, body, param)
            logger.info(`Service: User ${id} update ${user} ...`);
            return user;
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    async delete(id) {
        try {
            await UsersModel.findByIdAndDelete(id)
            logger.info(`Service: User ${id} delete ...`);
            return {status: 'OK', message: 'Item is delete ... '};
        } catch(error) {
            logger.error({message: err.message, stack: err.stack});
        }
    }
}

module.exports = new UserService();
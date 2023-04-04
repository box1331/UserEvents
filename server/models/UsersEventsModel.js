const {Schema, model} = require('mongoose');

const UsersEventsSchema = new Schema({
    userName: {
        type: String,
        require: true,
        trim: true
    }, 
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    }
});

module.exports = model('UsersEventsModel', UsersEventsSchema);
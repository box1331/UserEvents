const {Schema, model} = require('mongoose');

const UsersAuthSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    passwordConfirm: {
        type: String,
        require: true,
        trim: true
    }
}, {timestamps: true});

module.exports = model('UserAuthModel', UsersAuthSchema)


const UsersAuthModel = require('../models/UsersAuthModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {secret} = require('../config');
const ApiError = require('../helpers/apiErrors');
const logger = require('../logger');


const generateAccessToken = (id) => {
    const payload = {
        id
    }

    return jwt.sign(payload, secret, {expiresIn: '24h'});
}


class AuthService {

    //REGISTRATION
    async registration(firstName, lastName, email, password, passwordConfirm) {
        try {
            const candidate = await UsersAuthModel.findOne({firstName: firstName});
            
            if (candidate) {
                throw ApiError.BadRequest(`Service: User name ${email} is already registered ... `);
            }

            const hashPassword = bcrypt.hashSync(password, 5);
            const hashPasswordConfirm = bcrypt.hashSync(passwordConfirm, 5);
            const user = new UsersAuthModel({firstName: firstName, lastName: lastName, email: email, password: hashPassword, passwordConfirm: hashPasswordConfirm});
            await user.save();
            logger.info(`Service: User ${user.email} is successfully registered ...`);
            return user;
            
        } catch (err) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    //Login
    async login(email, password) {
        try {

            //Validation user
            const user = await UsersAuthModel.findOne({email: email});
            if (!user) {
                throw ApiError.BadRequest(`User name ${email} is not found ...`);
            }
            
            //Validation password
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw ApiError.BadRequest(`Password is incorrect ...`);                 
            }

            //JWT 
            const token = generateAccessToken(user._id);
            // res.json(`Bearer ${token}`);  =>   then need to slit(' ')[1]     
            
            if (token) {
                logger.info(`Service: User ${user.email} connect successfuly ... `);
            }

            return {token, user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        };  
            
        } catch (err) {
            logger.error({message: err.message, stack: err.stack});
        }
    }

    //USERS
    async getUsers(token) {
        try {
            const decodedToken = jwt.verify(token, secret);
            const user = await UsersAuthModel.findOne({_id: decodedToken.id});
            return user

        } catch (err) {
            // res.status(403).json({message: 'User is not authorized ...'});
            logger.error({message: err.message, stack: err.stack});
        }
    }
}


module.exports = new AuthService();
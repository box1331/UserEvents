require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const UserRouter = require('./routers/UsersRouter');
const UsersEventsRouter = require('./routers/UsersEventsRouter');
const UsersAuthRouter = require('./routers/UsersAuthRouter');
const logger = require('./logger');

const mwError = require('./middleware/mwError');

const PORT = process.env.PORT || 7000;
// const DB = process.env.DB || 'mongodb://127.0.0.1:27017/vue-33'
const DB = 'mongodb://user:user111@ac-nyatdsd-shard-00-00.mhbznv2.mongodb.net:27017,ac-nyatdsd-shard-00-01.mhbznv2.mongodb.net:27017,ac-nyatdsd-shard-00-02.mhbznv2.mongodb.net:27017/?ssl=true&replicaSet=atlas-tvfjfw-shard-0&authSource=admin&retryWrites=true&w=majority'
// const DB = 'mongodb+srv://user:user111@cluster0.mhbznv2.mongodb.net/?retryWrites=true&w=majority'
const pid = process.pid;

const app = express();

app.use(express.static(path.resolve(__dirname, 'clientVue')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.json({message: 'Server is already ... '})
})

app.use(cors({credentials: true, 'Access-Control-Allow-Origin': 'http://localhost:5000'}));

app.use(UserRouter);
app.use(UsersEventsRouter);
app.use(UsersAuthRouter);

// Error Handling
app.use(mwError);

const start = async (req, res) => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            logger.info(`Worker started on PORT ${PORT} PID ${pid} in mode ${process.env.NODE_ENV}`);   
        });
    } catch(err) {
        logger.error({message: err.message});
    }
}

start();


//Uncaught Exception
process.on('uncaughtException', (err) => {
    logger.error((new Date).toUTCString() + ' uncaughtException:', {message: err.message});
    logger.error('uncaughtException:', {stack: err.stack});
    process.exit(1);
});
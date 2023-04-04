const MongoDB = require('winston-mongodb');

const {createLogger, transports, format} = require('winston');
const {timestamp, combine, errors, json, metadata} = format;

function buildProdLogger() {

    return createLogger({
        transports: [
            //INFO
            new transports.File({
                level: 'info',
                filename: __dirname + '/logs/log-prod-info.log'
            }),
            //ERROR
            new transports.File({
                level: 'error',
                filename: __dirname + '/logs/log-prod-error.log',
            }),
            //ERROR MONGODB
            new transports.MongoDB({
                db: process.env.DB,
                collection: 'logs',
                options: { useUnifiedTopology: true },
                level: 'error'
            }),
            //CONSOLE
            new transports.Console({
                level: 'info'
            }),
        ],
        format: combine(
            timestamp(), 
            errors({stack: true}),
            metadata(),
            json()
        ),
        defaultMeta: { service: 'user-service' }
    });
}
 

module.exports = buildProdLogger;



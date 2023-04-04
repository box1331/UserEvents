const path = require('path');

const {createLogger, transports, format} = require('winston');
const {timestamp, combine, printf, errors} = format;


function buildDevLogger() {
    
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level} ${stack || message}`;
    });

    const pathFolder = process.cwd;

    return createLogger({
        transports: [
            //INFO
            new transports.File({
                level: 'info',
                filename: __dirname + '/logs/log-dev-info.log'   
            }),
            //ERROR
            new transports.File({
                filename: __dirname + '/logs/log-dev-error.log',
                level: 'error',
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
                level: 'info',
            }),
        ],
        format: combine(
            timestamp({format: 'YYYY-MM-DD HH-mm-ss'}), 
            format.colorize(),
            errors({stack: true}),
            logFormat
        ),
        defaultMeta: { service: 'user-service' },
        pathFolder
    });
}

module.exports = buildDevLogger;

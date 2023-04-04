const buildDevLogger = require('./logger-dev');
const buildProdLogger = require('./logger-prod');

let logger = null;

if (process.env.NODE_ENV === 'development') {
    logger = buildDevLogger();
} else {
    logger = buildProdLogger();
}

module.exports = logger;
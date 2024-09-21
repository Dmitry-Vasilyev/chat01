const winston = require('winston');
const {format} = require('winston');

const env = process.env.NODE_ENV || 'development';

const consoleFormat =format.combine(
    format.colorize(),
    format.timestamp({format : 'YYYY-MM-DD HH:mm:ss'}),
    format.printf(({timestamp, level, message, ...meta}) => {
        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
    })
);

const fileFormat =format.combine(
    format.timestamp(),
    format.errors({stack: true}),
    format.splat(),
    format.json()
);

const transports = [
    new winston.transports.File({
        filename: 'server/logs/error.log',
        level: 'error',
        format: fileFormat
    }),
    new winston.transports.File({
        filename: 'server/logs/info.log',
        format: fileFormat
    })
];

if(env !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: consoleFormat,
            level: 'debug'
        })
    );
} else {
    transports.push(
        new winston.transports.Console({
            format: consoleFormat,
            level: 'info'
        })
    );
}

const logger = winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    transports,
    exitOnError: false
});




module.exports = logger;
const logger = require('../utils/logger');
const ErrorResponse = require('../responses/ErrorResponse');
const ValidationErrorResponse = require('../responses/ValidationErrorResponse');

function errorMiddleware(err, req, res, next) {
    const env = process.env.NODE_ENV || 'development';

    if(err.isOperational) {
        logger.error(`API Error: ${err.message}`, {
            statusCode: err.statusCode,
            errorCode: err.errorCode,
            stack: err.stack,
            errors: err.errors
        });

        if(err.statusCode === 422) { // Ошибки валидации
            return res.status(422).json(
                new ValidationErrorResponse(err.message, err.errors).toJSON()
            );
        }

        //Общие ошибки
        return res.status(err.statusCode).json(
            new ErrorResponse(err.message, err.statusCode, err.errorCode).toJSON()
        );
    }

    //Логирование необработаных ошибок
    logger.error(`Unhandled Error: ${err.message}`, {
        stack: err.stack
    });


    const response = new ErrorResponse("Internal server error", 500).toJSON();

    if(env === 'development') {
        response.stack = err.stack;
        response.error = err.message;
    }

    res.status(500).json(response);
}

module.exports = errorMiddleware;
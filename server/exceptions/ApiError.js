class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, errorCode = null, errors = [],  stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorCode = errorCode;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // Исключаем сам конструктор из стека
        }
    }
    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errorCode: this.errorCode,
            errors: this.errors
        };
    }

    static badRequest(msg, errorCode = "BAD_REQUEST", errors = []) {
        return new ApiError(400, msg, true, errorCode, errors );
    }

    static internal(msg, errorCode = "INTERNAL_ERROR") {
        return new ApiError(500, msg, true, errorCode );
    }

    static notFound(msg, errorCode = "NOT_FOUND") {
        return new ApiError(404, msg, true, errorCode);
    }

    static conflict(msg, errorCode = "CONFLICT") {
        return new ApiError(409, msg, true, errorCode);
    }

    static unauthorized(msg, errorCode = "UNAUTHORIZED") {
        return new ApiError(401, msg, true, errorCode);
    }

    static forbidden(msg, errorCode = "FORBIDDEN") {
        return new ApiError(403, msg, true, errorCode);
    }

    static validationError(msg, errors) {
        return new ApiError(422, msg, true, 'VALIDATION_ERROR', errors);
    }
}

module.exports = ApiError;
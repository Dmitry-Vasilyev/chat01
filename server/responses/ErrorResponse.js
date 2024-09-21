const Response = require('./Response');

class ErrorResponse extends Response {
    constructor(message, statusCode = 500, errorCode = null) {
        super(statusCode, message);
        this.error = errorCode;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errorCode: this.errorCode
        };
    }
}

module.exports = ErrorResponse;
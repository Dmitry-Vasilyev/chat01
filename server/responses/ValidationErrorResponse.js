const ErrorResponse = require("./ErrorResponse");

class ValidationErrorResponse extends ErrorResponse {
    constructor(message, errors = []) {
        super(message, 422, "VALIDATION_ERROR");
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errorCode: this.errorCode,
            errors: this.errors
        };
    }
}

module.exports = ValidationErrorResponse;


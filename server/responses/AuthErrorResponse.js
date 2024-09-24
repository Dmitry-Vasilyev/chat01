const ErrorResponse = require("./ErrorResponse");

class AuthErrorResponse extends ErrorResponse {
    constructor(message) {
        super(message, 401, 'AUTH_ERROR');
    }

    static forbidden(message = "Access denied") {
        return new AuthErrorResponse(message).withStatusCode(403);
    }

    withStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
}
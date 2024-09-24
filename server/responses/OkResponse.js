const Response = require('./Response');

class OkResponse extends Response {
    constructor (message, data = null) {
        super(200, message, data);
    }

    static created(message,data) {
        return new OkResponse(message, data).withStatusCode(201);
    }

    withStatusCode (statusCode) {
        this.statusCode = statusCode;
        return this;
    }
}

module.exports = OkResponse;
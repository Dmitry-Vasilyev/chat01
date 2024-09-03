const TokenModel = require("../models/TokenModel");
const jwt = require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);

        return {accessToken, refreshToken};
    }
}

module.exports = TokenService;
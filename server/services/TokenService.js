const TokenModel = require("../models/TokenModel");
const jwt = require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET);
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET);

        return {accessToken, refreshToken};
    }

    async saveToken(refreshToken, userId) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = TokenService;
const TokenModel = require("../models/TokenModel");
const jwt = require("jsonwebtoken");

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload,
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE});
        const refreshToken = jwt.sign(payload,
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE});

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

    async removeToken(refreshToken) {
        const {deletedCount} = await TokenModel.deleteOne({refreshToken});
        return deletedCount;
    }

    async validateRefreshToken(refreshToken) {
        const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        return userData;
    }

    async findToken(refreshToken) {
        const token = await TokenModel.findOne({refreshToken});
        return token;
    }
}

module.exports = TokenService;
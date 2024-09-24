const ApiError = require('../exceptions/ApiError');

function authMiddleware(tokenService) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const accessToken = authHeader && authHeader.split(' ')[1];

            if(!accessToken) {
                throw ApiError.unauthorized("Missing token");
            }

            // console.log(accessToken);
            const userData = await tokenService.validateAccessToken(accessToken);
            if(!userData) {
                throw ApiError.forbidden("Incorrect token");
            }

            req.user = userData;
            console.log(userData);
            next();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = authMiddleware;
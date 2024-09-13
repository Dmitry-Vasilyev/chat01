function authMiddleware(tokenService) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const accessToken = authHeader && authHeader.split(' ')[1];

            if(!accessToken) {
                return res.status(401).send({message: "Missing token"});
            }

            // console.log(accessToken);
            const userData = await tokenService.validateAccessToken(accessToken);
            if(!userData) {
                return res.status(403).send({message: "Incorrect token"});
            }

            req.user = userData;
            console.log(userData);
            next();
        } catch (e) {
            return res.status(403).send({message: "Incorrect token"});
        }
    }
}

module.exports = authMiddleware;
class Application {
    constructor({UserController = require('../controllers/UserController'),
                    UserService = require('../services/UserService'),
                    hashUtil = require('../utils/HashUtil'),
                    TokenService = require('../services/TokenService'),
                    AuthRoutes = require('../routers/authRoutes'),
                    AuthValidator = require('../validators/AuthValidator'),
                    authMiddleware = require('../middleware/authMiddleware')} = {}) {
        this.hashUtil = hashUtil;
        this.tokenService = new TokenService();
        this.userService = new UserService(this.hashUtil, this.tokenService);
        this.userController = new UserController(this.userService);
        this.authValidator = new AuthValidator();
        this.authMiddleware = authMiddleware(this.tokenService);
        this.authRouter = new AuthRoutes(this.userController, this.authValidator, this.authMiddleware).getRouter();
    }

    getAuthRouter() {
        return this.authRouter;
    }
}

module.exports = Application;
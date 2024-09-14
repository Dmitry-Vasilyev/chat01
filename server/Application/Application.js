const DefaultTokenService = require('../services/TokenService');
const DefaultUserService = require('../services/UserService');
const DefaultUserController = require('../controllers/UserController');
const DefaultHashUtil = require('../utils/HashUtil');
const DefaultAuthRoutes = require('../routers/authRoutes');
const DefaultAuthValidator = require('../validators/AuthValidator');
const DefaulAuthMiddleware = require('../middleware/authMiddleware');

class Application {
    constructor({UserController = DefaultUserController,
                    UserService = DefaultUserService,
                    hashUtil = DefaultHashUtil,
                    TokenService = DefaultTokenService,
                    AuthRoutes = DefaultAuthRoutes,
                    AuthValidator = DefaultAuthValidator,
                    authMiddleware = DefaulAuthMiddleware} = {}) {
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
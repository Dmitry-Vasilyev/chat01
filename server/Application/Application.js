
class Application {
    constructor({UserController, UserService, hashUtil, TokenService, AuthRoutes, AuthValidator, authMiddleware}) {
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
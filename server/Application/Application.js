
class Application {
    constructor({UserController, UserService, hashUtil, TokenService, AuthRoutes, AuthValidator}) {
        this.hashUtil = hashUtil;
        this.tokenService = new TokenService();
        this.userService = new UserService(this.hashUtil, this.tokenService);
        this.userController = new UserController(this.userService);
        this.authValidator = new AuthValidator();
        this.authRouter = new AuthRoutes(this.userController, this.authValidator).getRouter();
    }

    getAuthRouter() {
        return this.authRouter;
    }
}

module.exports = Application;

class Application {
    constructor({UserController, UserService, hashUtil, TokenService, AuthRoutes}) {
        this.hashUtil = hashUtil;
        this.tokenService = new TokenService();
        this.userService = new UserService(this.hashUtil, this.tokenService);
        this.userController = new UserController(this.userService);
        this.authRouter = new AuthRoutes(this.userController).getRouter();
    }

    getAuthRouter() {
        return this.authRouter;
    }
}

module.exports = Application;
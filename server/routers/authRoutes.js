const Router = require('express').Router;

class AuthRoutes {
    constructor(userController, authValidator) {
        this.authRouter = new Router();
        this.userController = userController;
        this.authValidator = authValidator;

        this.setupRoutes();
    }

    setupRoutes() {
        this.authRouter.post('/registration',
            this.authValidator.registrationValRules(),
            this.userController.registration);
        this.authRouter.post('/login',
            this.authValidator.loginValRules(),
            this.userController.login);
        this.authRouter.post('/logout',
            this.authValidator.tokenValRules(),
            this.userController.logout);
        this.authRouter.get('/activate/:link', this.userController.activate);
        this.authRouter.get('/refresh',
            this.authValidator.tokenValRules(),
            this.userController.refresh);
        this.authRouter.get('/users', this.userController.getUsers);
    }

    getRouter() {
        return this.authRouter;
    }
}

module.exports = AuthRoutes;
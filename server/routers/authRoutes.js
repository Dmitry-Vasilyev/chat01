const Router = require('express').Router;

class AuthRoutes {
    constructor(userController) {
        this.authRouter = new Router();
        this.userController = userController;

        this.setupRoutes();
    }

    setupRoutes() {
        this.authRouter.post('/registration', this.userController.registration);
        this.authRouter.post('/login', this.userController.login);
        this.authRouter.post('/logout', this.userController.logout);
        this.authRouter.get('/activate/:link', this.userController.activate);
        this.authRouter.get('/refresh', this.userController.refresh);
        this.authRouter.get('/users', this.userController.getAllUsers);
    }

    getRouter() {
        return this.authRouter;
    }
}

module.exports = AuthRoutes;
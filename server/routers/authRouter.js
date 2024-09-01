const Router = require('express').Router;
const UserController = require('../controllers/UserController');
const UserService = require('../services/UserService');
const hashUtil = require('../utils/hashUtil');

const userService = new UserService(hashUtil);
const userController = new UserController(userService);

const authRouter = new Router();

authRouter.post('/registration', userController.registration);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/users', userController.getAllUsers);

module.exports = authRouter;
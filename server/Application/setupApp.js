const Application = require("./Application");
const TokenService = require('../services/TokenService');
const UserService = require('../services/UserService');
const UserController = require('../controllers/UserController');
const hashUtil = require('../utils/HashUtil');
const AuthRoutes = require('../routers/authRoutes');
const AuthValidator = require('../validators/AuthValidator');

function getApplication() {
    const dependencies = {
        TokenService,
        UserService,
        UserController,
        hashUtil,
        AuthRoutes,
        AuthValidator
    }
    return new Application(dependencies);
}

module.exports = getApplication();
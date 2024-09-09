const {validationResult} = require('express-validator');

class UserController {
    constructor(userService) {
        this.userService = userService;

        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email, password, nickname} = req.body;
            const userAuthData = await this.userService.registration(email, password, nickname);

            res.cookie('refreshToken', userAuthData.refreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true }); //30 min
            res.json(userAuthData);
        } catch (e) {
            console.log(e);
        }
    }

    async login (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {email, password} = req.body;
            const userAuthData = await this.userService.login(email, password);

            res.cookie('refreshToken', userAuthData.refreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true });
            res.json(userAuthData);
        } catch (e) {
            console.log(e);
        }
    }

    async logout (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {refreshToken} = req.cookies;
            await this.userService.logout(refreshToken);

            res.clearCookie('refreshToken');
            return res.json({message: 'Logged out'});
        } catch (e) {
            console.log(e);
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {refreshToken} = req.cookies;
            const userAuthData = await this.userService.refresh(refreshToken);

            res.cookie('refreshToken', userAuthData.refreshToken, { maxAge: 30 * 60 * 1000, httpOnly: true });
            res.json(userAuthData);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllUsers (req, res, next) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserController;
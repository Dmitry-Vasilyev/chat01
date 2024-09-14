const {validationResult} = require('express-validator');

class UserController {
    constructor(userService) {
        this.userService = userService;

        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email, password, nickname} = req.body;
            const userAuthData = await this.userService.registration(email, password, nickname);

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true }); //30 min
            return res.json(userAuthData);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
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

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true });
            return res.json(userAuthData);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
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
            return res.status(204).send();
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
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

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true });
            res.json(userAuthData);
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
        }
    }

    async getUsers (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            const users = await this.userService.getUsersPaginated(skip, limit);
            const usersCount = await this.userService.getUsersCount();

            res.json({
                usersCount,
                totalPages: Math.ceil(usersCount / limit),
                currentPage: page,
                users
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({message: 'Непредвиденная ошибка'});
        }
    }
}

module.exports = UserController;
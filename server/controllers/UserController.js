const {validationResult} = require('express-validator');
const OkResponse = require('../responses/OkResponse');
const ApiError = require('../exceptions/ApiError');

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
                return next(ApiError.validationError("Ошибка валидации" ,errors.array()));
            }
            const {email, password, nickname} = req.body;
            const userAuthData = await this.userService.registration(email, password, nickname);

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true }); //30 min
            return res.status(201).json(OkResponse.created(`Пользователь: ${email} создан`, userAuthData).toJSON());
        } catch (e) {
            next(e);
        }
    }

    async login (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.validationError("Ошибка валидации" ,errors.array()));
            }

            const {email, password} = req.body;
            const userAuthData = await this.userService.login(email, password);

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true });
            return res.json(new OkResponse(`User logged in as ${userAuthData.user.email}`, userAuthData).toJSON());
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.validationError("Ошибка валидации" ,errors.array()));
            }

            const {refreshToken} = req.cookies;
            await this.userService.logout(refreshToken);

            res.clearCookie('refreshToken');
            return res.json(new OkResponse(`User logged out`).withStatusCode(204));
        } catch (e) {
            next(e);
        }
    }

    async activate (req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.validationError("Ошибка валидации" ,errors.array()));
            }

            const {refreshToken} = req.cookies;
            const userAuthData = await this.userService.refresh(refreshToken);

            res.cookie('refreshToken',
                userAuthData.refreshToken,
                { maxAge: process.env.JWT_REFRESH_COOKIE_EXPIRE, httpOnly: true });
            return res.json(new OkResponse(`Token refreshed for ${userAuthData.user.email}`, userAuthData).toJSON());;
        } catch (e) {
            next(e);
        }
    }

    async getUsers (req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page - 1) * limit;

            const users = await this.userService.getUsersPaginated(skip, limit);
            const usersCount = await this.userService.getUsersCount();

            return res.json(new OkResponse("List of users",
                {
                    usersCount,
                    totalPages: Math.ceil(usersCount / limit),
                    currentPage: page,
                    users
                }).toJSON());
        } catch (e) {
            next(e);
        }
    }
}

module.exports = UserController;
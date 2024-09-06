class UserController {
    constructor(userService) {
        this.userService = userService;

        this.registration = this.registration.bind(this);
        this.login = this.login.bind(this);
    }

    async registration (req, res, next) {
        try {
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

        } catch (e) {
            console.log(e);
        }
    }

    async getAllUsers (req, res, next) {
        try {

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = UserController;
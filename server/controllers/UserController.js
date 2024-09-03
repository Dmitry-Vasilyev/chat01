class UserController {
    constructor(userService) {
        this.userService = userService;

        this.registration = this.registration.bind(this);
    }

    async registration (req, res, next) {
        try {
            const {email, password, nickname} = req.body;
            const userData = await this.userService.registration(email, password, nickname);
        } catch (e) {
            console.log(e);
        }
    }

    async login (req, res, next) {
        try {

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
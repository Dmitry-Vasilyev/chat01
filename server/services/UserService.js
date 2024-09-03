const UserModel = require("../models/UserModel");
const UserDto = require("../dtos/UserDto");

class UserService {
    constructor(hashUtil, tokenService) {
        this.hashUtil = hashUtil;
        this.tokenService = tokenService;
    }
    async registration (email, password, nickname) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw new Error(`User with email ${email} already exists`);
        }

        const hashedPassword = await this.hashUtil.hashPassword(password);

        const user = await UserModel.create({email, password: hashedPassword, nickname});

        const userDto = new UserDto(user);
        console.log(this.tokenService.generateToken({userDto}));
    }

}

module.exports = UserService;
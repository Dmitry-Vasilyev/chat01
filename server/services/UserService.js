const UserModel = require("../models/UserModel");
const UserDto = require("../dtos/UserDto");
const UserAuthDto = require("../dtos/UserAuthDto");

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

        const tokens = this.tokenService.generateToken({userDto});
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw new Error(`User with email ${email} is not registered`);
        }

        const isPassEqual = await this.hashUtil.comparePassword(password, user.password);
        if(!isPassEqual) {
            throw new Error(`User password is incorrect`);
        }

        const userDto = new UserDto(user);
        const tokens = this.tokenService.generateToken({...userDto});

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }
}

module.exports = UserService;
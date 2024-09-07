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
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }

    async logout(refreshToken) {
        const deletedCount = await this.tokenService.removeToken(refreshToken);

        if (deletedCount === 0) {
            throw new Error(`You are not logged in`);
        }
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw new Error(`Unauthorized accessing token`);
        }

        const userData = await this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await this.tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB) {
            throw new Error(`Unauthorized accessing token`);
        }

        const userDB = await UserModel.findOne(userData.id);
        const userDto = new UserDto(userDB);

        const tokens = this.tokenService.generateToken({userDto});
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }
}

module.exports = UserService;
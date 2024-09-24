const UserModel = require("../models/UserModel");
const UserDto = require("../dtos/UserDto");
const UserAuthDto = require("../dtos/UserAuthDto");
const ApiError = require('../exceptions/ApiError');

class UserService {
    constructor(hashUtil, tokenService) {
        this.hashUtil = hashUtil;
        this.tokenService = tokenService;
    }

    async registration (email, password, nickname) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.conflict(`User with email ${email} already exists`, "USER_ALREADY_EXISTS");
        }

        const hashedPassword = await this.hashUtil.hashPassword(password);
        const user = await UserModel.create({email, password: hashedPassword, nickname});

        const userDto = new UserDto(user);

        const tokens = this.tokenService.generateToken({...userDto});
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }

    async login (email, password) {
        const user = await UserModel.findOne({email});
        if(!user) {
            throw ApiError.notFound(`User with email ${email} is not registered`);
        }

        const isPassEqual = await this.hashUtil.comparePassword(password, user.password);
        if(!isPassEqual) {
            throw ApiError.badRequest(`User password do not match`);
        }

        const userDto = new UserDto(user);
        const tokens = this.tokenService.generateToken({...userDto});
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }

    async logout(refreshToken) {
        await this.tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        const userData = await this.tokenService.validateRefreshToken(refreshToken);
        if(!userData) {
            throw ApiError.badRequest(`Unauthorized accessing token`);
        }

        const tokenFromDB = await this.tokenService.findToken(refreshToken);
        if(!tokenFromDB) {
            throw ApiError.notFound(`No such token in DB`);
        }

        const userDB = await UserModel.findById(userData.id);
        if(!userDB) {
            throw ApiError.notFound(`No such user in DB`);
        }
        const userDto = new UserDto(userDB);

        const tokens = this.tokenService.generateToken({...userDto});
        await this.tokenService.saveToken(tokens.refreshToken, userDto.id);

        return new UserAuthDto({...userDto}, tokens.refreshToken, tokens.accessToken);
    }

    async getUsersPaginated(skip, limit) {
        let users = await UserModel.find().skip(skip).limit(limit);
        if(!users) {
            throw new Error("Db error");
        }

        users = users.map((user) => new UserDto(user));
        return users;
    }

    async getUsersCount() {
        const count = await UserModel.countDocuments();
        return count;
    }
}

module.exports = UserService;
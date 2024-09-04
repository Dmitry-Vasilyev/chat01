class UserAuthDto {
    constructor(userData, refreshToken, accessToken) {
        this.user = userData;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
    }
}

module.exports = UserAuthDto;
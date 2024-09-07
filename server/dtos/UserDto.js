class UserDto {
    id;
    email;
    nickname;
    role;
    isActivated;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.nickname = user.nickname;
        this.role = user.role;
        this.isActivated = user.isActivated;
    }
}

module.exports = UserDto;
const bcrypt = require('bcrypt');

class HashUtil {
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = new HashUtil();
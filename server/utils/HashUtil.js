const bcrypt = require('bcrypt');

class HashUtil {
    async hashPassword(password) {
        const saltRounds = parseInt(process.env.BCRYPT_PASS_SALT);
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

module.exports = new HashUtil();
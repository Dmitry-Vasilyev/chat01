const { cookie, body } = require("express-validator");

class AuthValidator {
    constructor() {
        this.registrationValRules = this.registrationValRules.bind(this);
        this.loginValRules = this.loginValRules.bind(this);
        this.tokenValRules = this.tokenValRules.bind(this);
    }

    registrationValRules() {
        return [
            body("email").trim().isEmail().normalizeEmail()
                .withMessage("Введите пожалуйста валидный емейл"),
            body("password").trim().isLength({min: 6, max: 16})
                .withMessage("Длина пароля должна быть от 6 до 16 символов")
                .matches(/\d/).withMessage('Пароль должен содержать хотя бы одну цифру')
                .matches(/[a-z]/).withMessage('Пароль должен содержать хотя бы одну строчную букву'),
            body("nickname").trim().isLength({min: 2, max: 16})
                .withMessage("Никнейм должен быть от 2 до 16 символов")
                .matches(/^[a-zA-Z0-9_]+$/)
                .withMessage('Никнейм может содержать только буквы, цифры и символ подчеркивания')
        ];
    }

    loginValRules() {
        return [
            body("email").trim().isEmail().normalizeEmail()
                .withMessage("Введите пожалуйста валидный емейл"),
            body("password").trim().isLength({min: 6, max: 16})
                .withMessage("Длина пароля должна быть от 6 до 16 символов")
                .matches(/\d/).withMessage('Пароль должен содержать хотя бы одну цифру')
                .matches(/[a-z]/).withMessage('Пароль должен содержать хотя бы одну строчную букву')
        ];
    }

    tokenValRules() {
        return [
            cookie("refreshToken").notEmpty().withMessage("Отсутствует рефреш токен")
        ]
    }
}

module.exports = AuthValidator;
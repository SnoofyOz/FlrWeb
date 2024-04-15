let { check } = require('express-validator');
let util = require('node:util')

let options = {
    password: {
        minLength: 1,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0,
        minNumbers: 0
    },
    username: {
        min: 1,
        max: 42
    }
}

let Notifies = {
    EMAIL: 'email phai dung dinh dang',
    PASSWORD: 'password dai it nhat %d ky tu, co it nhat %d chu hoa, %d chu thuong, %d ky tu, %d chu so',
    USERNAME: 'username dai %d den %d ki tu',
    ROLE: "Role Khong hop le"
}


module.exports = function () {
    return [
        check('email', Notifies.EMAIL).isEmail(),
        check('password', util.format(Notifies.PASSWORD, options.password.minLength,
            options.password.minUppercase, options.password.minLowercase,
            options.password.minSymbols, options.password.minNumbers)).isStrongPassword(options.password),
        check('username', util.format(Notifies.USERNAME,options.username.min,options.username.max)).isLength(options.username),
        check('role', Notifies.ROLE).isIn(["USER", "ADMIN", "PUBLISHER"])
    ]
}
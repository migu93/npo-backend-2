const Router = require('express')
const router = new Router()
const controller = require('./authController')
const check = require('express-validator')

router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', " Пароль не может быть меньше 6 символов").isLength({min: 6, max: 20})
],
    controller.registration)
router.post('login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router
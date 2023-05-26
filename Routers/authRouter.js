const Router = require('express')
const router = new Router()
const controller = require('../Controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")


router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', " Пароль не может быть меньше 6 символов").isLength({min: 6, max: 20})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']) , authMiddleware, controller.getUsers)

module.exports = router
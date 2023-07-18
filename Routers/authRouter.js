const Router = require('express')
const router = new Router()
const controller = require('../Controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const { getUserInfo } = require('../Controllers/userController');
const User = require('../models/User');
const Role = require('../models/Role');


router.post('/registration',[
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', " Пароль не может быть меньше 6 символов").isLength({min: 6, max: 20})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']) , authMiddleware, controller.getUsers)

// GET-запрос для получения логина и роли авторизованного пользователя
router.get('/get-info-user', authMiddleware, async (req, res) => {
    try {
        const { id, roles } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const roleIds = user.roles;
        const userRoles = await Role.find({ _id: { $in: roleIds } }).select('value');

        const { username } = user;
        const userRolesValues = userRoles.map(role => role.value);
        res.json({ username, roles: userRolesValues });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});



module.exports = router
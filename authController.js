const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');
const {secret} = require("./config")
const generateAccsessToken = (id, roles) => {
    const payLoad = {
        id,
        roles
    }
    return jwt.sign(payLoad, secret, {expiresIn: "24h"})
}
class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                res.status(400).json({message: "Ошибка при регистрации", errors})
            }

            const {username, password} = req.body;
            const candidate = await User.findOne({username}); // поиск пользователя в бд

            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "admin"});

            const user = new User({username, password:hashPassword, roles: [userRole.value]})
            await user.save();
            return res.json({message: "Пользователь успешно зарегистрирован"})
            if (!userRole) {
                return res.status(400).json({message: "Роль пользователя не найдена"});
            }

            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Ошибка регистрации'});
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "Неверный логин или пароль"})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Неверный логин или пароль'})
            }
            const token = generateAccsessToken(user._id, user.roles)
            return res.json({token})

        } catch (e) {
            console.log(e)
            req.status(400).json({message: 'Ошибка аутентификации'})
        }
    }
    async getUsers(req, res) {
        try {

            res.json("Роли добавлены")
        } catch (e) {

        }
    }
}
module.exports = new authController()
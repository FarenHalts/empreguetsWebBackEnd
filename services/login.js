const loginDB = require('../repositorie/loginDB')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        let loginData = {
            email: req.email
        }
        const getLogin = await loginDB.login(loginData)
        //Gerando Token com JWT
        if (getLogin.length != 0) {
            const token = jwt.sign({
                id_usuario: getLogin[0].id_usuario,
                tipo_usuario: getLogin[0].tipo_usuario
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            })
            let returnLogin = {
                getLogin,
                token,
                canShow: true
            }
            return returnLogin
        } else {
            let returnLogin = {
                canShow: false
            }
            return returnLogin
        }
    },
    decriptToken: async (req, res) => {
        const token = req
        const decript = jwt.verify(token, process.env.JWT_KEY)
        //Retornando o id do usuário
        const decriptReturn = {
            id_usuario: decript.id_usuario,
            tipo_usuario: decript.tipo_usuario
        }
        return decriptReturn
    }
}
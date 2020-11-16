const loginDB = require('../repositorie/loginDB')
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        let loginData = {
            email: req.email
        }
        const getLogin = await loginDB.login(loginData)
        //Gerando Token com JWT
        const token = jwt.sign({
            id_usuario: getLogin[0].id_usuario
        },
        process.env.JWT_KEY,
        {
            expiresIn: "1h"
        })
        let returnLogin = {
            getLogin,
            token
            
        }
        return returnLogin
    }
}
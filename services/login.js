const loginDB = require('../repositorie/loginDB')

module.exports = {
    login: async (req, res) => {
        let loginData = {
            email: req.email
        }
        const getLogin = await loginDB.login(loginData)
        return getLogin
    },
}
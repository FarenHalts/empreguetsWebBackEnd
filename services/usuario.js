const userDB = require('../repositorie/UsuarioDB')

module.exports = {
    getUser: async (req, res) => {
        const check = await userDB.verifyUser(req)
        return check
    },
}
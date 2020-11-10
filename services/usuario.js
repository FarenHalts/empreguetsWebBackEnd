
const UsuarioDB = require('../repositorie/UsuarioDB')

module.exports = {
    getSingleUser: async (req, res) => {
        const oi = await UsuarioDB.getSingleUser(req)
        return oi
    },
}
const userDB = require('../repositorie/UsuarioDB')
const prest = require('../repositorie/PrestadorDB')
const soli = require('../repositorie/SolicitadorDB')

module.exports = {
    getUser: async (req, res) => {
        const check = await userDB.verifyUser(req)
        return check
    },
    getSingleUser: async (req, res) => {
        const check = await userDB.getSingleUser(req)
        return check
    },
    getProfile: async (req, res) => {
        if (req.tipo_usuario == 'Prestador') {
            const profile = await prest.getSinglePrestador(req.id_usuario)
            return profile
        } else if(req.tipo_usuario == 'Solicitador'){
            const profile = await soli.getSingleSolicitador(req.id_usuario)
            return profile
        }
    },
}
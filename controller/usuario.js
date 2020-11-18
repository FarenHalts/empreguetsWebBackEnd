'use strict'
const apiResponse = require("roit-response-api-node")
const user = require('../services/usuario')
const token = require('../services/login')

module.exports = {
    getProfile: async (req, res) => {
        const tokenHeader = req.headers.authorization
        const desriptToken = await token.decriptToken(tokenHeader)
        const profile = await user.getProfile(desriptToken)
        res.json(apiResponse.OkResponse(profile, 'Dados do usuário carregados com sucesso!'))
    }
}
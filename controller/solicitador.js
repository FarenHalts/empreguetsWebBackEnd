'use strict'
var createUser = require('../services/solicitador')

module.exports = {
    createSolicitador: async (req, res) => {
      let solicitador = req
        await createUser.createUserSolicitador(solicitador)
    }
}
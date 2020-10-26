'use strict'
var createUser = require('../models/solicitador')

module.exports = {
    createSolicitador: async (req, res) => {
      let solicitador = req
        await createUser.createUserSolicitador(solicitador)
    }
}
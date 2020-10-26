'use strict'
var userService = require('../service/userService')

module.exports = {
    test: async (req, res) => {
      let prestador = req
        await userService.createUserPrestador(prestador)
    },
    createSolicitador: async (req, res) => {
      let solicitador = req
      await userService.createUserSolicitador(solicitador)
    }
}
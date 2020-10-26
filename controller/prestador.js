'use strict'
var createUser = require('../models/prestador')

module.exports = {
    createPrestador: async (req, res) => {
      let prestador = req
        await createUser.createUserPrestador(prestador)
    },
    getPrestador: async (req, res) => {
      let prestador = req
        await createUser.getPrestador(prestador)
    }
}
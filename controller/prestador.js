'use strict'
const response = require("roit-response-api-node")
var createUser = require('../services/prestador')

module.exports = {
    createPrestador: async (req, res) => {
      let prestador = req
        await createUser.createUserPrestador(prestador)
      },
      getPrestador: async (req, res) => {
        const get = await createUser.getPrestador();
        res.json(response.OkResponse(get[0], 'Success'))
    },
    updatePrestador: async (req, res) => {
      let prest = req
      await createUser.updateUserPrestador(prest)
      res.json(response.OkResponse('Prestador atualizado com sucesso!'))
    },
    deletePrestador: async (req, res) => {
      let prest = req
      await createUser.deletePrestador(prest)
      res.json(response.OkResponse('Prestador removido com sucesso!'))
    }
}
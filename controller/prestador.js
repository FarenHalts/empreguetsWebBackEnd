'use strict'
const apiResponse = require("roit-response-api-node")
var createUser = require('../services/prestador')

module.exports = {
  createPrestador: async (req, res) => {
    let prestador = req
    await createUser.createUserPrestador(prestador)
    res.json(apiResponse.OkResponse(prestador[0], 'Prestador criado com sucesso!'))
  },
  getPrestador: async (req, res) => {
    const get = await createUser.getPrestador();
    //Validação para ver se existem prestadores cadastrados
    if (get[0].length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Success'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem prestadores cadastrados!'))
    }
  },
  updatePrestador: async (req, res) => {
    let prest = req
    await createUser.updateUserPrestador(prest)
    res.json(apiResponse.OkResponse(prest[0], 'Prestador atualizado com sucesso!'))
  },
  deletePrestador: async (req, res) => {
    let prest = req
    await createUser.deletePrestador(prest)
    res.json(apiResponse.OkResponse(prest[0], 'Prestador removido com sucesso!'))
  },
  getSinglePrestador: async (req, res) => {
    let id = req.params.id
    const get = await createUser.getSinglePrestador(id);
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Prestador encontrado com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Prestador não existe em nossa base de dados!'))
    }
  }
}
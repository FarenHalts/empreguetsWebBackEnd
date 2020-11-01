'use strict'
const createUser = require('../services/solicitador')
const apiResponse = require("roit-response-api-node")

module.exports = {
  createSolicitador: async (req, res) => {
    let solicitador = req
    await createUser.createUserSolicitador(solicitador)
    res.json(apiResponse.OkResponse(solicitador[0], 'Solicitador criado com sucesso!'))
  },
  getSolicitador: async (req, res) => {
    const get = await createUser.getSolicitador();
    //Validação para ver se existem prestadores cadastrados
    if (get[0].length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Success'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem solicitadores cadastrados!'))
    }
  },
  updateSolicitador: async (req, res) => {
    let solicitador = req
    await createUser.updateUserSolicitador(solicitador)
    res.json(apiResponse.OkResponse(solicitador[0], 'Solicitador atualizado com sucesso!'))
  },
  deleteSolicitador: async (req, res) => {
    let solicitador = req
    await createUser.deleteSolicitador(solicitador)
    res.json(apiResponse.OkResponse(solicitador[0], 'Prestador removido com sucesso!'))
  },
  getSingleSolicitador: async (req, res) => {
    let id = req.params.id
    const get = await createUser.getSingleSolicitador(id);
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Solicitador encontrado com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Solicitador não existe em nossa base de dados!'))
    }
  }
}
'use strict'
const createUser = require('../services/solicitador')
const apiResponse = require("roit-response-api-node")
const service = require('../services/servico')
const user = require('../services/usuario')

module.exports = {
  createSolicitador: async (req, res) => {
    let email = req.body.email
    let usuario = await user.getUser(email)
    //Verificando se já existem email cadastrados
    if (usuario.length > 0) {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Endereço de email já utilizado!'))
    } else {
      let solicitador = req
      await createUser.createUserSolicitador(solicitador)
      res.json(apiResponse.OkResponse(solicitador[0], 'Solicitador criado com sucesso!'))
    }
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
    //Verificando se o uruario existe
    const get = await createUser.getSingleSolicitador(req.body.id_usuario);
    if (get.length > 0) {
      //Verificando se o usuario possui algum serviço em andamento ou em solicitação
      const verify = await service.checkUser(req)
      if (verify.length > 0) {
        res.status(400).send(apiResponse.ErrorResponse(null, 'Não foi possível exlcluir este perfil pois ainda existem serviços em andamento!'))
      } else {
        let solicitador = req
        await createUser.deleteSolicitador(solicitador)
        res.json(apiResponse.OkResponse(null, 'Solicitador removido com sucesso!'))
      }
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Solicitador não existe em nossa base de dados!'))
    }
  },
  getSingleSolicitador: async (req, res) => {
    let id = req.params.id
    const get = await createUser.getSingleSolicitador(id);
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Solicitador encontrado com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Solicitador não existe em nossa base de dados!'))
    }
  },
  getTopSolicitador: async (req, res) => {
    const get = await createUser.getTopSolicitador();
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Solicitadores encontrados com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Houve um problema na API!'))
    }
  },
  getLocSolicitador: async (req, res) => {
    const get = await createUser.getLocalizationSolicitador();
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get[0], 'Solicitadores encontrados com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Nenhum solicitador em nossa base de dados!'))
    }
  }
}
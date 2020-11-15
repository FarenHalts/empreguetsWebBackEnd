'use strict'
const apiResponse = require("roit-response-api-node")
var createUser = require('../services/prestador')
const service = require('../services/servico')
const user = require('../services/usuario')

module.exports = {
  createPrestador: async (req, res) => {
    let email = req.body.email
    let usuario = await user.getUser(email)
    //Verificando se já existem email cadastrados
    if (usuario.length > 0) {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Endereço de email já utilizado!'))
    } else {
      let prestador = req
      await createUser.createUserPrestador(prestador)
      res.json(apiResponse.OkResponse(prestador[0], 'Prestador criado com sucesso!'))
    }
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
  //Removendo um Prestador
  deletePrestador: async (req, res) => {
    //Verificando se o uruario existe
    const get = await createUser.getSinglePrestador(req.body.id_usuario);
    if (get.length > 0) {
      //Verificando se o usuario possui algum serviço em andamento ou em solicitação
      const verify = await service.checkUser(req)
      if (verify.length > 0) {
        res.status(400).send(apiResponse.ErrorResponse(null, 'Não foi possível exlcluir este perfil pois ainda existem serviços em andamento!'))
      } else {
        let prest = req
        await createUser.deletePrestador(prest)
        res.json(apiResponse.OkResponse(null, 'Prestador removido com sucesso!'))
      }
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Prestador não existe em nossa base de dados!'))
    }
  },
  //Pegar um prestador unico
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
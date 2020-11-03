'use strict'
const apiResponse = require("roit-response-api-node")
var createService = require('../services/servico')

module.exports = {
    reserveService: async (req, res) => {
        let servico = req
        await createService.markService(servico)
        res.json(apiResponse.OkResponse(servico[0], 'Serviço enviado com sucesso!'))
      },
      getServices: async (req, res) => {
        let id = req.params.id
        const get = await createService.getServices(id);
        //Validando se existem solicitações de serviço para o usuário requisitado
        if (get.length > 0) {
          res.json(apiResponse.OkResponse(get, 'Serviços listados com sucesso!'))
        } else {
          res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem solicitações cadastradas para esse usuario!'))
        }
      },
      discardService: async (req, res) => {
        let id = req.body.id_agenda
        let get = await createService.getServiceId(id)
        if (get.length > 0) {
          let oi = await createService.discardService(get[0])
          let a = await createService.removeFromList(get[0].id_agenda)
          let verify = await createService.getServices(get[0].id_requisitado)
          if (verify.length == 0) {
            //Caso passe aqui, significa que o usuario nao tem mais serviços, e o atributo solicitação pode retornar para false
          }
          res.json(apiResponse.OkResponse(null, 'Agendamento recusado com sucesso!'))
        } else {
          res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem agendamentos para esse id!'))
        }
      }
}
'use strict'
const apiResponse = require("roit-response-api-node")
const createService = require('../services/servico')
const userService = require('../services/usuario')
const moment = require('moment')

module.exports = {
  reserveService: async (req, res) => {
    let servico = req
    await createService.markService(servico)
    res.json(apiResponse.OkResponse(servico[0], 'Serviço enviado com sucesso!'))
  },
  getScheduling: async (req, res) => {
    let id = req.params.id
    const get = await createService.getScheduling(id);
    //Validando se existem solicitações de agendamento para o usuário requisitado
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get, 'Agendamentos listados com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem agendamentos cadastrados para esse usuario!'))
    }
  },
  discardService: async (req, res) => {
    let id = req.body.id_agenda
    let get = await createService.getScheduleId(id)
    if (get.length > 0) {
      let oi = await createService.discardService(get[0])
      let a = await createService.removeFromList(get[0].id_agenda)
      let verify = await createService.getScheduling(get[0].id_requisitado)
      if (verify.length == 0) {
        //Caso passe aqui, significa que o usuario nao tem mais serviços, e o atributo solicitação pode retornar para false
        await createService.setSolicitationFalse(get[0].id_requisitado)
      }
      res.json(apiResponse.OkResponse(null, 'Agendamento recusado com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem agendamentos para esse id!'))
    }
  },
  acceptService: async (req, res) => {
    let id = req.body.id_agenda
    let get = await createService.getScheduleId(id)
    if (get.length > 0) {
      await createService.acceptService(get[0])
      await createService.reserveData(get[0])
      await createService.removeFromList(get[0].id_agenda)
      let verify = await createService.getScheduling(get[0].id_requisitado)
      if (verify.length == 0) {
        //Caso passe aqui, significa que o usuario nao tem mais serviços, e o atributo solicitação pode retornar para false
        await createService.setSolicitationFalse(get[0].id_requisitado)
      }
      res.json(apiResponse.OkResponse(null, 'Agendamento aceito com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem agendamentos para esse id!'))
    }
  },
  getServices: async (req, res) => {
    let id = req.params.id
    const get = await createService.getServices(id);
    //Validando se existem serviços para o usuário requisitado
    if (get.length > 0) {
      res.json(apiResponse.OkResponse(get, 'Serviços listados com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem serviços cadastrados para esse usuario!'))
    }
  },
  //Avaliando servico
  rateService: async (req, res) => {
    const service = await createService.checkService(req.body.id_servico)
    if (service.length > 0) {
      //Verificando se o serviço ja foi avaliado
      if (service[0].status_servico == 'pendente') {
        let serviceDate = moment(service[0].data, "DD/MM/YYYY").format("YYYY/MM/DD")
        let rateDate = moment().format("YYYY/MM/DD")
        //Verificando se o usuario está tentando avaliar um serviço que ainda não foi concluido
        if (rateDate > serviceDate) {
          await createService.rateService(service, req.body)
          res.json(apiResponse.OkResponse(null, 'Avaliação enviada com sucesso!'))
          //Setando a media de avaliacao no atributo avaliacao_media do usuario
          await createService.getAverageRate(service[0].id_requisitado)
        } else {
          res.status(400).send(apiResponse.ErrorResponse(null, 'O serviço ainda não foi concluido, aguarde o mesmo ser concluido para avaliar!'))
        }
      } else {
        res.status(400).send(apiResponse.ErrorResponse(null, 'Esse serviço já foi avaliado!'))
      }
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem serviços cadastrados!'))
    }
  },
  //Carregando os ultimos 5 registros a fim de ser mostrado no perfil do usuario
  getRates: async (req, res) => {
    let id = req.params.id
    //Verificando se o usuário existe na base de dados
    const user = await userService.getSingleUser(id)
    if (user.length > 0) {
      const rates = await createService.getRates(id)
      //Verificando se existem avaliações
      if (rates.length > 0) {
        res.json(apiResponse.OkResponse(rates, 'Avaliações carregadas com sucesso!'))
      } else {
        res.status(400).send(apiResponse.ErrorResponse(null, 'Não existem avaliações para esse usuário!'))
      }
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Esse usuário não existe em nossa base de dados!'))
    }
  },
  getReservedDates: async (req, res) => {
    let id = req.params.id
    const dates = await createService.getReservedDates(id)
    if (dates.length > 0) {
      res.json(apiResponse.OkResponse(dates, 'Datas dos serviços carregados com sucesso!'))
    } else {
      res.status(400).send(apiResponse.ErrorResponse(null, 'Não foram encontradas datas de serviço para o usuario!'))
    }
  },
}
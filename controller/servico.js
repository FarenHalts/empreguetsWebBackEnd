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

}
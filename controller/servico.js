'use strict'
const apiResponse = require("roit-response-api-node")
var createService = require('../services/servico')

module.exports = {
    reserveService: async (req, res) => {
        let servico = req
        await createService.markService(servico)
        res.json(apiResponse.OkResponse(servico[0], 'Serviço enviado com sucesso!'))
      },
}
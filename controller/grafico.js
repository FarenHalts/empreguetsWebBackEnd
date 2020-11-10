'use strict'
const apiResponse = require("roit-response-api-node")
const grafico = require('../services/grafico')
const userService = require('../services/usuario')

module.exports = {
    getDataGraphic: async (req, res) => {
        let id = req.params.id
        const user = await userService.getSingleUser(id)
        if (user.length == 0) {
            res.status(400).send(apiResponse.ErrorResponse(null, 'Usuário não existe em nossa base de dados!'))
        }
        else {
            const getGrafico = await grafico.getGraficService(id)
            //Verificando a quantidade de servicos em cada retorno
            const obj = {
                pendings: getGrafico.pending.length,
                reports: getGrafico.reports.length,
                completed: getGrafico.completed.length
            }
            res.json(apiResponse.OkResponse(obj, 'Dados dos graficos listados com sucesso!'))
        }
    }
}
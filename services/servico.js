const servicoDB = require('../repositorie/servicoDB')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports = {
    markService: async (req, res) => {
        var servico = {
            id_requisitado: req.body.id_requisitado,
            id_usuario: req.body.id_usuario,
            data: req.body.data,
            endereco: req.body.endereco,
            valor_proposto: req.body.valor_proposto,
            novo_valor: req.body.novo_valor,
        }
        await servicoDB.reserveService(servico)
    },
    checkUser: async (req, res) => {
        //Verificando se o usuario possui algum serviço em andamento ou em solicitação
        let verifyService = {
            id: req.body.id_usuario
        }
        let responseVerify = await servicoDB.verifyService(verifyService.id)
        return responseVerify
    }
}
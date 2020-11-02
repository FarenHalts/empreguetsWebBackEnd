const servicoDB = require('../repositorie/servicoDB')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports = {
    markService: async (req, res) => {
        //Setando na tabela que o usuario tem uma solicitacao, é onde ele vai poder aceitar ou recusar (tipo um convite)
        let solicitacao = {
            solicitacao: 'true',
            id_usuario: req.body.id_requisitado
        }
        await servicoDB.solicitacaoTrue(solicitacao)
        var servico = {
            id_requisitado: req.body.id_requisitado,
            id_usuario: req.body.id_usuario,
            data: req.body.data,
            endereco: req.body.endereco,
            valor_proposto: req.body.valor_proposto,
            novo_valor: req.body.novo_valor,
            visualizado: 'false'
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
    },
    getServices: async (req, res) => {
        const servicos = await servicoDB.getServices(req)
        return servicos
    },
}
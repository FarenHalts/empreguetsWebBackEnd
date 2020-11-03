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
            novo_valor: req.body.novo_valor
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
    getServiceId: async (req, res) => {
        const servico = await servicoDB.getServiceId(req)
        return servico
    },
    discardService: async (req, res) => {
        const discardData = moment().format('DD-MM-YYYY');
        const discard = {
            id_agenda: req.id_agenda,
            id_requisitado: req.id_requisitado,
            data: req.data,
            endereco: req.endereco,
            valor_proposto: req.valor_proposto,
            novo_valor: req.novo_valor,
            id_usuario: req.id_usuario,
            data_recusado: discardData
        }
        let responseDiscard = await servicoDB.discardService(discard)
        return responseDiscard
    },
    removeFromList: async (req, res) => {
        await servicoDB.removeFromList(req)
    }
}
const servicoDB = require('../repositorie/servicoDB')
const usuarioDB = require('../repositorie/UsuarioDB')
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
        let responseVerify = await servicoDB.verifyService(verifyService)
        return responseVerify
    },
    getScheduling: async (req, res) => {
        const servicos = await servicoDB.getScheduling(req)
        return servicos
    },
    getScheduleId: async (req, res) => {
        const servico = await servicoDB.getScheduleId(req)
        return servico
    },
    discardService: async (req, res) => {
        const discardData = moment().format('DD-MM-YYYY HH:mm');
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
    },
    setSolicitationFalse: async (req, res) => {
        let solicitation = {
            id_usuario: req,
            statusSolicitation: 'false'
        }
        await servicoDB.updateSolicitation(solicitation)
    },
    acceptService: async (req, res) => {
        const acceptData = moment().format('DD-MM-YYYY HH:mm');
        const status = 'pendente'
        let valor = null
        //Validando se o usuario aceitou o novo valor proposto
        if (req.novo_valor) {
            valor = req.novo_valor
        } else {
            valor = req.valor_proposto
        }
        let service = {
            id_usuario: req.id_usuario,
            id_requisitado: req.id_requisitado,
            endereco: req.endereco,
            valor_proposto: valor,
            data: req.data,
            status_servico: status,
            data_aceito: acceptData
        }
        await servicoDB.acceptService(service)
    },
    getServices: async (req, res) => {
        const servicos = await servicoDB.getServices(req)
        return servicos
    },
    checkService: async (req, res) => {
        const service = await servicoDB.checkService(req)
        return service
    },
    rateService: async (service, req, res) => {
        let today = moment().format("DD/MM/YYYY HH:mm")
        let rating = {
            id_usuarioAvaliado: service[0].id_requisitado,
            id_analista: service[0].id_usuario,
            id_servico: service[0].id_servico,
            comentario: req.descricao_avaliacao,
            avaliacao: req.avaliacao,
            data_avaliacao: today,
            contratempo: req.contratempo
        }
        await servicoDB.rateService(rating)
        //Verificando se houve algum problema com o serviço
        if (req.contratempo == 'true') {
            let reportOBJ = {
                id_servico: service[0].id_servico,
                status: 'reportado'
            }
            await servicoDB.statusService(reportOBJ)
        } else {
            let doneOBJ = {
                id_servico: service[0].id_servico,
                status: 'concluido'
            }
            await servicoDB.statusService(doneOBJ)
        }
    },
    getRates: async (req, res) => {
        const rate = await servicoDB.getRates(req)
        return rate
    },
    getAverageRate: async (req, res) => {
        const average = await servicoDB.getAverage(req)
        const a = average[0].media;
        const str_a = a.toString();
        const result = Number(str_a.slice(0, 4));

        let avg = {
            usuario: req,
            media: result
        }
        await usuarioDB.updateAverage(avg)
    },
    reserveData: async (req, res) => {
        let reserveData = {
            id_usuario: req.id_usuario,
            id_requisitado: req.id_requisitado,
            data: req.data
        }
        await servicoDB.reserveData(reserveData)
    },
    getReservedDates: async (req) => {
        const dates = await servicoDB.getReservedDatas(req)
        return dates
    },
}
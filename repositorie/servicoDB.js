const db = require('../database/db')
const DB = require('../database/db')

module.exports = {
    reserveService: async (service) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_agenda ' +
                '(id_requisitado, data, endereco, valor_proposto, novo_valor, id_usuario) ' +
                'value (?,?,?,?,?,?);',
                [
                    service.id_requisitado,
                    service.data,
                    service.endereco,
                    service.valor_proposto,
                    service.novo_valor,
                    service.id_usuario
                ])
    },
    verifyService: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM `emp_agenda` AS agenda WHERE agenda.id_requisitado=? OR agenda.id_usuario=? ',
            [
                id,
                id
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    solicitacaoTrue: async (solicitacao) => {
        let response = await DB.connection()
            .query(`UPDATE emp_usuario SET solicitacao=? WHERE id_usuario=?`,
                [
                    solicitacao.solicitacao,
                    solicitacao.id_usuario
                ],
            )
    },
    //Listar todos o serviços baseados em um usuário
    getServices: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_agenda WHERE id_requisitado=? ',
            [
                id
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    //Listar um unico serviço
    getServiceId: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_agenda WHERE id_agenda=? ',
            [
                id
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    discardService: async (service) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_agendamentos_recusados ' +
                '(id_agenda, id_requisitado, id_usuario, data, endereco, valor_proposto, novo_valor, data_recusado) ' +
                'value (?,?,?,?,?,?,?,?);',
                [
                    service.id_agenda,
                    service.id_requisitado,
                    service.id_usuario,
                    service.data,
                    service.endereco,
                    service.valor_proposto,
                    service.novo_valor,
                    service.data_recusado
                ])
    },
    removeFromList: async (id) => {
        let response = await DB.connection()
            .execute('DELETE FROM `emp_agenda` WHERE id_agenda=?',
                [
                    id
                ])
    },
}
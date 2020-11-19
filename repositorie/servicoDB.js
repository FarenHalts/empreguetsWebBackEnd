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
            .query('SELECT * FROM emp_servico WHERE (id_usuario=? OR id_requisitado=?) AND (status_servico="pendente")',
                [
                    id.id,
                    id.id
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
    //Listar todos os agendamentos baseados em um usuário
    getScheduling: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_agenda WHERE id_requisitado=? ',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    //Listar um unico serviço
    getScheduleId: async (id) => {
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
    //Setando o atributo "solicitacao" para false, onde indica que o usuario nao possui mais nenhum servico em solicitacao
    updateSolicitation: async (solicitacao) => {
        let response = await DB.connection()
            .query(`UPDATE emp_usuario SET solicitacao=? WHERE id_usuario=?`,
                [
                    solicitacao.statusSolicitation,
                    solicitacao.id_usuario
                ],
            )
    },
    acceptService: async (service) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_servico ' +
                '(id_usuario, id_requisitado, endereco, valor, data, status_servico, data_aceito) ' +
                'value (?,?,?,?,?,?,?);',
                [
                    service.id_usuario,
                    service.id_requisitado,
                    service.endereco,
                    service.valor_proposto,
                    service.data,
                    service.status_servico,
                    service.data_aceito,
                ])
    },
    getServices: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_servico WHERE (id_requisitado=? OR id_usuario=?) AND status_servico="pendente" ',
                [
                    id,
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    checkService: async (id) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_servico WHERE id_servico=?',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    rateService: async (rateOBJ) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_avaliacoes ' +
                '(id_usuario, id_servico, id_analista, comentario, avaliacao, data_avaliacao, contratempo) ' +
                'value (?,?,?,?,?,?,?);',
                [
                    rateOBJ.id_usuarioAvaliado,
                    rateOBJ.id_servico,
                    rateOBJ.id_analista,
                    rateOBJ.comentario,
                    rateOBJ.avaliacao,
                    rateOBJ.data_avaliacao,
                    rateOBJ.contratempo
                ])
    },
    getRates: async (id) => {
        let response = await DB.connection()
            .query('SELECT avali.id_avaliacao, avali.id_servico, avali.id_usuario, avali.id_analista, avali.comentario, avali.avaliacao, avali.data_avaliacao, avali.contratempo, usuario.nome FROM emp_avaliacoes AS avali INNER JOIN emp_usuario AS usuario ON avali.id_analista = usuario.id_usuario WHERE avali.id_usuario=? ORDER BY data_avaliacao DESC LIMIT 5',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    getAverage: async (id) => {
        let response = await DB.connection()
            .query('SELECT AVG(avaliacao) AS media FROM emp_avaliacoes WHERE id_usuario=?',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    statusService: async (reportOBJ) => {
        let response = await DB.connection()
            .query(`UPDATE emp_servico SET status_servico=? WHERE id_servico=?`,
                [
                    reportOBJ.status,
                    reportOBJ.id_servico
                ],
            )
    },
}
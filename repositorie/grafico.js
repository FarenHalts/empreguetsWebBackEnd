const DB = require('../database/db')

module.exports = {
    //Listar todos os agendamentos baseados em um usuário
    getPending: async (obj) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_servico WHERE (id_requisitado=? OR id_usuario=?) AND status_servico=? ',
            [
                obj.id,
                obj.id,
                obj.status
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    getReports: async (obj) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_servico WHERE (id_requisitado=? OR id_usuario=?) AND status_servico=? ',
            [
                obj.id,
                obj.id,
                obj.status
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    getCompleted: async (obj) => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_servico WHERE (id_requisitado=? OR id_usuario=?) AND status_servico=? ',
            [
                obj.id,
                obj.id,
                obj.status
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
}
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
                    service.id_usuario,
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
}
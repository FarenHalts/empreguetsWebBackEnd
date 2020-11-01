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
}
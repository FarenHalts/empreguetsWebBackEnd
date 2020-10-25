const DB = require('../database/db')

module.exports = {
        createSolicitador: async (user) => {
        let response = await DB.connection()
        .execute('INSERT INTO emp_usuario' +  
        '(documento, valor_servico, servicos_contratados, id_usuario)' + 
        'value (?,?,?,?);', 
        [
        user.documento,
        user.valor_servico,
        user.servicos_contratados,
        user.id_usuario
        ])
    },
        getSolicitador: async() => {
        let response = await DB.connection()
        .query('SELECT * from emp_solicitador AS solicitador INNER JOIN emp_usuario AS usuario ON solicitador.id_usuario = usuario.id_usuario;')
        return JSON.parse(JSON.stringify(response))
    }
}
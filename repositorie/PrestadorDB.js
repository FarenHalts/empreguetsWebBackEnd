const DB = require('../database/db')

module.exports = {
        createPrestador: async(user) => {
        let response = await DB.connection()
        .execute('INSERT INTO emp_prestador ' +  
        '(cpf, rg, data_nascimento, valor_diaria, raio, id_usuario) ' + 
        'value (?,?,?,?,?,?);',
        [
        user.cpf,
        user.rg,
        user.data_nascimento,
        user.valor_diaria,
        user.raio,
        user.id_usuario,
        ])
    },
        getPrestador: async() => {
        let response = await DB.connection()
        .query('SELECT * from emp_prestador AS prestador INNER JOIN emp_usuario AS usuario ON prestador.id_usuario = usuario.id_usuario;')
        return JSON.parse(JSON.stringify(response))
    },
    updatePrestador: async(user) => {
        // let response = await DB.connection()
        // .execute(`UPDATE emp_prestador SET cpf=${prest.cpf} rg=${prest.rg}, data_nascimento=${prest.data_nascimento}, valor_diaria=${prest.valor_diaria}, raio=${prest.raio}, servicos_efetuados=${prest.servicos_efetuados} WHERE id_usuario = ${prest.id_usuario}`)
        await DB.connection()
        .execute('UPDATE emp_prestador SET ?, ?, ?, ?, ?, ? WHERE ?', [{ cpf: user.cpf, rg: user.rg, data_nascimento: user.data_nascimento, valor_diaria: user.valor_diaria, raio: user.raio, servicos_efetuados: user.servicos_efetuados}, 
            { id_usuario: user.id_usuario }])
    }
}
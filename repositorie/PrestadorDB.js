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
        console.log(user);
        let response = await DB.connection()
        .query(`UPDATE emp_prestador SET cpf=?, rg=?, valor_diaria=?, raio=? WHERE id_usuario=?`,
        [
        user.cpf,
        user.rg,
        user.valor_diaria,
        user.raio,
        user.id_usuario
        ],
        )
    }
}
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
    },
    deletePrestador: async (user) => {
        let response = await DB.connection()
        .execute('DELETE FROM `emp_prestador` WHERE id_usuario=?',
        [
            user.id_usuario
        ])
    },
    getSinglePrestador: async(user) => {
        let response = await DB.connection()
        .execute('SELECT * from emp_prestador AS prestador INNER JOIN emp_usuario AS usuario ON prestador.id_usuario = usuario.id_usuario WHERE prestador.id_usuario=?;',
        [
            user.id_usuario
        ],)
        return JSON.parse(JSON.stringify(response[0]))
    },
    createRemovedPrestador: async (user) => {
    let response = await DB.connection()
    .execute('INSERT INTO emp_prestadores_removidos ' +  
    '(id_usuario, nome, email, telefone, cep, endereco, bairro, num_endereco, complemento, descricao_perfil, avaliacao_media, foto, tipo_usuario, id_prestador, cpf, rg, data_nascimento, valor_diaria, raio, servicos_efetuados) ' + 
    'value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);', 
    [
    user.id_usuario,
    user.nome,
    user.email,
    user.telefone,
    user.cep,
    user.endereco,
    user.bairro,
    user.num_endereco,
    user.complemento,
    user.descricao_perfil,
    user.avaliacao_media,
    user.foto,
    user.tipo_usuario,
    user.id_prestador,
    user.cpf,
    user.rg,
    user.data_nascimento,
    user.valor_diaria,
    user.raio,
    user.servicos_efetuados,
    ])
},
}
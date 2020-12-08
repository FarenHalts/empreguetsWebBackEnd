const DB = require('../database/db')

module.exports = {
    createPrestador: async (user) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_prestador ' +
                '(cpf, rg, data_nascimento, valor_servico, raio, id_usuario) ' +
                'value (?,?,?,?,?,?);',
                [
                    user.cpf,
                    user.rg,
                    user.data_nascimento,
                    user.valor_servico,
                    user.raio,
                    user.id_usuario
                ])
    },
    getPrestador: async () => {
        let response = await DB.connection()
            .query('SELECT * FROM emp_prestador AS prestador INNER JOIN emp_usuario AS usuario ON prestador.id_usuario = usuario.id_usuario;')
        return JSON.parse(JSON.stringify(response))
    },
    updatePrestador: async (user) => {
        let response = await DB.connection()
            .query(`UPDATE emp_prestador SET cpf=?, rg=?, valor_servico=?, raio=? WHERE id_usuario=?`,
                [
                    user.cpf,
                    user.rg,
                    user.valor_servico,
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
    getSinglePrestador: async (id) => {
        let response = await DB.connection()
            .execute('SELECT * from emp_prestador AS prestador INNER JOIN emp_usuario AS usuario ON prestador.id_usuario = usuario.id_usuario WHERE prestador.id_usuario=?;',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    createRemovedPrestador: async (user, removedData) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_prestadores_removidos ' +
                '(id_usuario, nome, email, telefone, cep, endereco, bairro, num_endereco, complemento, descricao_perfil, avaliacao_media, foto, tipo_usuario, id_prestador, cpf, rg, data_nascimento, valor_servico, raio, servicos, data_remocao) ' +
                'value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
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
                    user.valor_servico,
                    user.raio,
                    user.servicos,
                    removedData
                ])
    },
    getTopPrestador: async () => {
        let response = await DB.connection()
            .query('SELECT * from emp_prestador AS prestador INNER JOIN emp_usuario AS usuario ON prestador.id_usuario = usuario.id_usuario ORDER BY usuario.avaliacao_media DESC LIMIT 4;')
        return JSON.parse(JSON.stringify(response))
    },
    getLocalizationPrestador: async () => {
        let response = await DB.connection()
            .query(`SELECT lat, lng, foto, id_usuario from emp_usuario WHERE tipo_usuario='Prestador'`)
        return JSON.parse(JSON.stringify(response))
    },
}
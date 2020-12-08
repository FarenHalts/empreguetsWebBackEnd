const DB = require('../database/db')

module.exports = {
    createSolicitador: async (user) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_solicitador' +
                '(documento, valor_servico, id_usuario)' +
                'value (?,?,?);',
                [
                    user.documento,
                    user.valor_servico,
                    user.id_usuario
                ])
    },
    getSolicitador: async () => {
        let response = await DB.connection()
            .query('SELECT * from emp_solicitador AS solicitador INNER JOIN emp_usuario AS usuario ON solicitador.id_usuario = usuario.id_usuario;')
        return JSON.parse(JSON.stringify(response))
    },
    updateSolicitador: async (user) => {
        let response = await DB.connection()
            .query(`UPDATE emp_solicitador SET documento=?, valor_servico=? WHERE id_usuario=?`,
                [
                    user.documento,
                    user.valor_servico,
                    user.id_usuario
                ],
            )
    },
    getSingleSolicitador: async (id) => {
        let response = await DB.connection()
            .execute('SELECT * from emp_solicitador AS solicitador INNER JOIN emp_usuario AS usuario ON solicitador.id_usuario = usuario.id_usuario WHERE solicitador.id_usuario=?;',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    createRemovedSolicitador: async (user, removedData) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_solicitadores_removidos ' +
                '(id_usuario, nome, email, servicos, id_solicitador, documento, valor_servico, telefone, cep, endereco, bairro, num_endereco, complemento, descricao_perfil, avaliacao_media, foto, tipo_usuario, data_remocao) ' +
                'value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                [
                    user.id_usuario,
                    user.nome,
                    user.email,
                    user.servicos,
                    user.id_solicitador,
                    user.documento,
                    user.valor_servico,
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
                    removedData,
                ])
    },
    deleteSolicitador: async (user) => {
        let response = await DB.connection()
            .execute('DELETE FROM `emp_solicitador` WHERE id_usuario=?',
                [
                    user.id_usuario
                ])
    },
    getTopSolicitador: async () => {
        let response = await DB.connection()
            .query('SELECT * from emp_solicitador AS solicitador INNER JOIN emp_usuario AS usuario ON solicitador.id_usuario = usuario.id_usuario ORDER BY usuario.avaliacao_media DESC LIMIT 4;')
        return JSON.parse(JSON.stringify(response))
    },
    getLocalizationSolicitador: async () => {
        let response = await DB.connection()
            .query(`SELECT lat, lng, foto, id_usuario from emp_usuario WHERE tipo_usuario='Solicitador'`)
        return JSON.parse(JSON.stringify(response))
    },
}
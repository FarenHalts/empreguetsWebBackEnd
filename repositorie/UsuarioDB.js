const DB = require('../database/db')

module.exports = {
    createUser: async (user) => {
        let response = await DB.connection()
            .execute('INSERT INTO emp_usuario ' +
                '(nome, email, senha, telefone, cep, endereco, bairro, num_endereco, complemento, descricao_perfil, foto, tipo_usuario, solicitacao, lat, lng, servicos) ' +
                'value (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);',
                [
                    user.nome,
                    user.email,
                    user.senha,
                    user.telefone,
                    user.cep,
                    user.endereco,
                    user.bairro,
                    user.num_endereco,
                    user.complemento,
                    user.descricao_perfil,
                    user.foto,
                    user.tipo_usuario,
                    user.solicitacao,
                    user.lat,
                    user.lng,
                    user.servicos
                ])
        console.log(response[0].insertId);
        return response[0].insertId
    },
    getUsers: async () => {
        let response = await DB.connection()
            .query('SELECT * from emp_usuario;')
        return JSON.parse(JSON.stringify(response))
    },
    updateUser: async (user, password) => {
        let response = await DB.connection()
            .execute(`UPDATE emp_usuario SET nome=?, email=?, senha=?, telefone=?, cep=?, endereco=?, bairro=?, num_endereco=?, complemento=?, descricao_perfil=?, foto=?, tipo_usuario=? WHERE id_usuario=?`,
                [
                    user.nome,
                    user.email,
                    password,
                    user.telefone,
                    user.cep,
                    user.endereco,
                    user.bairro,
                    user.num_endereco,
                    user.complemento,
                    user.descricao_perfil,
                    user.foto,
                    user.tipo_usuario,
                    user.id_usuario
                ])
    },
    updateUserNoPassword: async (user) => {
        let response = await DB.connection()
            .execute(`UPDATE emp_usuario SET nome=?, email=?, telefone=?, cep=?, endereco=?, bairro=?, num_endereco=?, complemento=?, descricao_perfil=?, foto=?, tipo_usuario=? WHERE id_usuario=?`,
                [
                    user.nome,
                    user.email,
                    user.telefone,
                    user.cep,
                    user.endereco,
                    user.bairro,
                    user.num_endereco,
                    user.complemento,
                    user.descricao_perfil,
                    user.foto,
                    user.tipo_usuario,
                    user.id_usuario
                ])
    },
    deleteUser: async (user) => {
        let response = await DB.connection()
            .execute('DELETE FROM `emp_usuario` WHERE id_usuario=?',
                [
                    user.id_usuario
                ])
    },
    getSingleUser: async (id) => {
        let response = await DB.connection()
            .execute('SELECT * from emp_usuario WHERE id_usuario=?;',
                [
                    id
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
    updateAverage: async (avg) => {
        let response = await DB.connection()
            .execute(`UPDATE emp_usuario SET avaliacao_media=? WHERE id_usuario=?`,
                [
                    avg.media,
                    avg.usuario
                ])
    },
    verifyUser: async (email) => {
        let response = await DB.connection()
            .execute('SELECT * from emp_usuario WHERE email=?;',
                [
                    email
                ])
        return JSON.parse(JSON.stringify(response[0]))
    },
}
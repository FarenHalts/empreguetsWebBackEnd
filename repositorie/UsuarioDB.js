const DB = require('../database/db')

module.exports = {
    createUser: async (user) => {
        console.log(user);
        let response = await DB.connection()
            .execute('INSERT INTO emp_usuario ' +
                '(nome, email, senha, telefone, cep, endereco, bairro, num_endereco, complemento, descricao_perfil, foto, tipo_usuario) ' +
                'value (?,?,?,?,?,?,?,?,?,?,?,?);',
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
                    user.tipo_usuario
                ])
        console.log(response[0].insertId);
        return response[0].insertId
    },
    getUsers: async () => {
        let response = await DB.connection()
            .query('SELECT * from emp_usuario;')
        console.log('respostinha', response);
        return JSON.parse(JSON.stringify(response))
    },
    updateUser: async (user) => {
        console.log(user.nome);
        let response = await DB.connection()
            .execute(`UPDATE emp_usuario SET nome=?, email=?, senha=?, telefone=?, cep=?, endereco=?, bairro=?, num_endereco=?, complemento=?, descricao_perfil=?, foto=?, tipo_usuario=? WHERE id_usuario=?`,
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
}
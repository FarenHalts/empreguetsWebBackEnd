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
        return JSON.parse(JSON.stringify(response))
    }
}
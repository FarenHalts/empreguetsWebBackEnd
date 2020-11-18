const DB = require('../database/db')

module.exports = {
    login: async (loginData) => {
        let response = await DB.connection()
            .query('SELECT email, senha, id_usuario, tipo_usuario FROM emp_usuario WHERE email=?',
            [
                loginData.email
            ])
        return JSON.parse(JSON.stringify(response[0]))
    },
}
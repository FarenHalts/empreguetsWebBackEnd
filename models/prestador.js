const userDB = require('../repositorie/UsuarioDB')
const prestadorDB = require('../repositorie/PrestadorDB')
const bcrypt = require('bcrypt')

module.exports = {
        createUserPrestador: async (req, res) => {
        let senha = await bcrypt.hash(req.body.senha, 10)
        var usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: senha,
            telefone: req.body.telefone,
            cep: req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            num_endereco: req.body.num_endereco,
            complemento: req.body.complemento,
            descricao_perfil: req.body.descricao_perfil,
            foto: req.body.foto,
            tipo_usuario: req.body.tipo_usuario
        }
        var userId = await userDB.createUser(usuario)
        var prestador = {
            cpf: req.body.cpf,
            rg: req.body.rg,
            data_nascimento: req.body.data_nascimento,
            valor_diaria: req.body.valor_diaria,
            raio: req.body.raio,
            id_usuario: userId
        }
        await prestadorDB.createPrestador(prestador)
    }
}
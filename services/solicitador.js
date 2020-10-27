const userDB = require('../repositorie/UsuarioDB')
const solicitadorDB = require ('../repositorie/SolicitadorDB')
const bcrypt = require('bcrypt')

module.exports = {
        createUserSolicitador: async (req, res) => {
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
        var solicitador = {
            documento: req.body.documento,
            valor_servico: req.body.valor_servico,
            servicos_contratados: req.body.servicos_contratados,
            id_usuario: userId
        }
        await solicitadorDB.createSolicitador(solicitador)
    },
    
}
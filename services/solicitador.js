const userDB = require('../repositorie/UsuarioDB')
const solicitadorDB = require('../repositorie/SolicitadorDB')
const bcrypt = require('bcrypt')
const moment = require('moment')

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
            tipo_usuario: req.body.tipo_usuario,
            solicitacao: 'false'
        }
        var userId = await userDB.createUser(usuario)
        var solicitador = {
            documento: req.body.documento,
            valor_servico: req.body.valor_servico,
            id_usuario: userId
        }
        await solicitadorDB.createSolicitador(solicitador)
    },
    getSolicitador: async (req, res) => {
        const oi = await solicitadorDB.getSolicitador()
        return oi
    },
    updateUserSolicitador: async (req, res) => {
        var usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            telefone: req.body.telefone,
            cep: req.body.cep,
            endereco: req.body.endereco,
            bairro: req.body.bairro,
            num_endereco: req.body.num_endereco,
            complemento: req.body.complemento,
            descricao_perfil: req.body.descricao_perfil,
            foto: req.body.foto,
            tipo_usuario: req.body.tipo_usuario,
            id_usuario: req.body.id_usuario
        }
        await userDB.updateUser(usuario)
        var solicitador = {
            documento: req.body.documento,
            valor_servico: req.body.valor_servico,
            id_usuario: req.body.id_usuario
        }
        await solicitadorDB.updateSolicitador(solicitador)
    },
    deleteSolicitador: async (req, res) => {
        const removedData = moment().format('DD-MM-YYYY');
        // PEGANDO OS DADOS DE QUEM ESTÁ SENDO REMOVIDO
        let singleSolicitador = {
            id_usuario: req.body.id_usuario
        }
        let responseSolicitador = await solicitadorDB.getSingleSolicitador(singleSolicitador.id_usuario)
        console.log(responseSolicitador);
        // SALVANDO OS DADOS DE QUEM ESTÁ SENDO REMOVIDO
        await solicitadorDB.createRemovedSolicitador(responseSolicitador[0], removedData)

        let solicitador = {
            id_usuario: req.body.id_usuario
        }
        //Removendo primeiro da tabela do Solicitador
        await solicitadorDB.deleteSolicitador(solicitador)

        let usuario = {
            id_usuario: req.body.id_usuario
        }
        //Removendo da tabela do usuário após ser removido da tebala Solicitador
        await userDB.deleteUser(usuario)
    },
    getSingleSolicitador: async (req, res) => {
        const oi = await solicitadorDB.getSingleSolicitador(req)
        return oi
    },
}
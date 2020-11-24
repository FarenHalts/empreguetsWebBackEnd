const userDB = require('../repositorie/UsuarioDB')
const prestadorDB = require('../repositorie/PrestadorDB')
const bcrypt = require('bcrypt')
const moment = require('moment')
const servico = require('./servico')
const servicoDB = require('../repositorie/servicoDB')

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
            tipo_usuario: req.body.tipo_usuario,
            solicitacao: 'false'
        }
        var userId = await userDB.createUser(usuario)
        var prestador = {
            cpf: req.body.cpf,
            rg: req.body.rg,
            data_nascimento: req.body.data_nascimento,
            valor_servico: req.body.valor_servico,
            raio: req.body.raio,
            id_usuario: userId
        }
        await prestadorDB.createPrestador(prestador)
    },
    getPrestador: async (req, res) => {
        const oi = await prestadorDB.getPrestador()
        return oi
    },
    updateUserPrestador: async (req, res) => {
        var usuario = {
            nome: req.body.nome,
            email: req.body.email,
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
        if (req.body.senha) {
            let senha = await bcrypt.hash(req.body.senha, 10)
            await userDB.updateUser(usuario, senha)
        } else {
            await userDB.updateUserNoPassword(usuario)
        }
        var prestador = {
            cpf: req.body.cpf,
            rg: req.body.rg,
            data_nascimento: req.body.data_nascimento,
            valor_servico: req.body.valor_servico,
            raio: req.body.raio,
            id_usuario: req.body.id_usuario
        }
        await prestadorDB.updatePrestador(prestador)
    },
    deletePrestador: async (req, res) => {
        const removedData = moment().format('DD-MM-YYYY HH:mm');
        // PEGANDO OS DADOS DE QUEM ESTÁ SENDO REMOVIDO
        let singlePrestador = {
            id_usuario: req.body.id_usuario
        }
        let responsePrestador = await prestadorDB.getSinglePrestador(singlePrestador.id_usuario)
        // SALVANDO OS DADOS DE QUEM ESTÁ SENDO REMOVIDO
        await prestadorDB.createRemovedPrestador(responsePrestador[0], removedData)
        let prestador = {
            id_usuario: req.body.id_usuario
        }
        await prestadorDB.deletePrestador(prestador)
        let usuario = {
            id_usuario: req.body.id_usuario
        }
        await userDB.deleteUser(usuario)
    },
    getSinglePrestador: async (req, res) => {
        const oi = await prestadorDB.getSinglePrestador(req)
        return oi
    },
    getTopPrestador: async (req, res) => {
        const top = await prestadorDB.getTopPrestador()
        return top
    },
}
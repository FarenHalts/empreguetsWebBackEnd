var userDB = require('../repositorie/UsuarioDB')
var prestadorDB = require('../repositorie/PrestadorDB')

module.exports = {
        createUser: async () => {
        var usuario = {
            nome: 'nome',
            email: 'lalala@hotmail.com',
            senha: '12345',
            telefone: '41999000',
            cep: '81850240',
            endereco: 'Rua Rua',
            bairro: 'Alto',
            num_endereco: '34',
            complemento: 'sobrado',
            descricao_perfil: 'Salve',
            foto: 'tu é né',
            tipo_usuario: 'A'
        }
        var userId = await userDB.createUser(usuario)
        var prestador = {
            cpf: '1124938',
            rg: '2314124',
            data_nascimento: new Date('1999/12/13'),
            valor_diaria: '23.33',
            raio: '34',
            servicos_efetuados: '43',
            id_usuario: userId
        }
        await prestadorDB.createPrestador(prestador)
    }
}
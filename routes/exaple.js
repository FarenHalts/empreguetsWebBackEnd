const prestador = require('../controller/prestador')
const solicitador = require('../controller/solicitador')
const servico = require('../controller/servico')
const security = require('../middleware/global/security')

module.exports = app => {
    app.route('/prestador')
        //Criar um Prestador
        .post(prestador.createPrestador)
        //Listar todos os Prestadores
        .get(prestador.getPrestador)
        //Atualizar Prestador
        .put(prestador.updatePrestador)
        //Deletar um Prestador
        .delete(prestador.deletePrestador)

    app.route('/solicitador')
        //Criar um Solicitador
        .post(solicitador.createSolicitador)
        //Listar todos os Solicitadores
        .get(solicitador.getSolicitador)
        //Atualizar Solicitador
        .put(solicitador.updateSolicitador)
        //Deletar um Solicitador
        .delete(solicitador.deleteSolicitador)

    //Prestadores Unicos
    app.route('/prestador/:id')
        //Pegar um Prestador especifico
        .get(prestador.getSinglePrestador)

    app.route('/solicitador/:id')
        //Pegar um Solicitador especifico
        .get(solicitador.getSingleSolicitador)
        //Fim prestadores Unicos

    app.route('/marcarservico')
        .post(servico.reserveService)

    app.route('/servico/:id')
        .get(servico.getServices)
}
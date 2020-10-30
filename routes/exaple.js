var prestador = require('../controller/prestador')
const solicitador = require('../controller/solicitador')
const security = require('../middleware/global/security')

module.exports = app => {
    app.route('/prestador')
        .post(prestador.createPrestador)
        .get(prestador.getPrestador)
        .put(prestador.updatePrestador)
        .delete(prestador.deletePrestador)

    app.route('/createSolicitador')
        .post(solicitador.createSolicitador)
}
var test = require('../controller/exaple')
const security = require('../middleware/global/security')

module.exports = app => {
    app.route('/createPrestador')
        .get(test.test)
        .post(test.test)
    app.route('/createSolicitador')
        .post(test.createSolicitador)
}
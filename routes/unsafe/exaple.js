var test = require('../../controller/exaple')

module.exports = app => {
    app.route('/teste')
        .get(test.test)
        .post(test.test)

}
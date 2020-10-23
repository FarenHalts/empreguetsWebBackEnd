var test = require('../../controller/exaple')
const security = require('../../middleware/global/security')

module.exports = app => {
    app.route('/')
        .get(test.test)
        .post(test.test)

}
var cors = require("cors")
var bodyParser = require("body-parser")
const sec = require('./security')


module.exports = app => {
    app.use(sec.validateJwt)
    app.use(bodyParser.json())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
}
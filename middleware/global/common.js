var cors = require("cors")
var bodyParser = require("body-parser")


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }))
}
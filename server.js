var express = require("express")
const consign = require('consign');
var cors = require("cors")

var app = express()

require('dotenv').config()

var port = process.env.PORT || 5000
app.use(cors())
consign()
    .include('./middleware/global')
    .then('routes')
    .into(app)

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})
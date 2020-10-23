var express = require("express")
const consign = require('consign');

var app = express()

require('dotenv').config()

var port = process.env.PORT || 5000

consign()
    .include('./middleware/global')
    .then('routes')
    .into(app)

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port)
})
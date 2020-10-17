var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
require('dotenv').config()

var port = process.env.PORT || 5000
var teste = require('./midware/security')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(teste.validateJwt)

var Users = require("./routes/Users")

app.use("/users", Users)

app.listen(port, () => {
    console.log("Servidor rodando na porta " + port);
})
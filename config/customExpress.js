const cors = require('cors')
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')


module.exports = () =>{
    const app = express()
    app.use(cors())
    app.use(bodyParser.json())
    consign().include('controllers').into(app)
    return app
}

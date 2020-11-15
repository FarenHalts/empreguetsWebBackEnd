'use strict'
const login = require('../services/login')
const bcrypt = require('bcrypt')
const apiResponse = require("roit-response-api-node")

module.exports = {
    login: async (req, res) => {
        const getLogin = await login.login(req.body)
        //Validando se o email informado existe na base de dados
        if (getLogin.length != 0) {
            const validPassword = await bcrypt.compare(req.body.senha, getLogin[0].senha)
            //Validando se a senha informada é igual a que está cadastrada na base de dados
            if (validPassword) {
                res.json(apiResponse.OkResponse('hash', 'Usuário validado com sucesso!'))
            } else {
                res.status(400).send(apiResponse.ErrorResponse(null, 'Senha inválida!'))
            }
        } else {
            res.status(400).send(apiResponse.ErrorResponse(null, 'Usuário não existente!'))
        }
    }
}
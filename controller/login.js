'use strict'
const login = require('../services/login')
const bcrypt = require('bcrypt')
const apiResponse = require("roit-response-api-node")
const jwt = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        const getLogin = await login.login(req.body)
        //Validando se o email informado existe na base de dados
        if (getLogin.canShow == true) {
            const validPassword = await bcrypt.compare(req.body.senha, getLogin.getLogin[0].senha)
            //Validando se a senha informada é igual a que está cadastrada na base de dados
            if (validPassword) {
                // let token = await login.generateToken()
                res.json(apiResponse.OkResponse(getLogin.token, 'Usuário validado com sucesso!'))
            } else {
                res.status(400).send(apiResponse.ErrorResponse(null, 'Senha inválida!'))
            }
        } else {
            res.status(400).send(apiResponse.ErrorResponse(null, 'Usuário não existente!'))
        }
    },
    token: async (req, res) => {
        try {
            const token = req.headers.authorization;
            const decode = jwt.verify(token, process.env.JWT_KEY)
            // console.log(decode);
            res.json(apiResponse.OkResponse(decode.id_usuario, 'Usuário validado com sucesso!'))
        } catch (error) {
            res.status(400).send(apiResponse.ErrorResponse(null, 'Token inválido!'))
        }
    }
}
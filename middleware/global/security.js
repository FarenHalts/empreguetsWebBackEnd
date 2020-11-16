var jwt = require('jsonwebtoken')
var privateKey = process.env.JWT_KEY
const apiResponse = require("roit-response-api-node")


module.exports = {
    validateJwt: (req, res, next) => {
        //Rotas que não precistam de validação
        let whiteList = ['/prestador', '/solicitador', '/login']
        if (req.method == "POST" && whiteList.includes(req.originalUrl)) {
            next()
        } else {
            try {
                const token = req.headers.authorization;
                jwt.verify(token, process.env.JWT_KEY)
                next()
            } catch (error) {
                let key = process.env.JWT_KEY
                res.status(403).send(apiResponse.ErrorResponse('key é: ' + key, 'Token inválido!'))
            }
        }
    }
}
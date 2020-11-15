var jwt = require('jsonwebtoken')
var privateKey = process.env.PRIVATE_KEY


module.exports = {
    validateJwt: (req, res, next) => {
        // jwt.verify(req.headers.authorization, privateKey, function(err, decoded) {
        //     console.log(decoded) // bar
        // });
        next()
    }
}
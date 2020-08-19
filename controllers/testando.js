const cost = require ('cors')
const Home = require('../models/testando')


module.exports = app => {
    app.get('/teste-get', (req, res) => {
        Home.lista(res)
    })

    app.get('/teste-get/:id', (req, res) =>{
        const id = parseInt(req.params.id)
        
        Home.buscaPorId(id, res)
    })

    app.post('/teste-post', (req, res) => {
        const home = req.body

        Home.adiciona(home, res)
    })
}
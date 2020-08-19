const conexao = require ('../infra/conexao')

class Home{
    adiciona (home, res){
        const sql = 'INSERT INTO Home SET ?'

        conexao.query(sql, home, (erro, resultados) =>{
            if (erro) {
                res.status(400).json(erro);
            } else {
                res.status(201).json(resultados);
            }
        })
    }
    lista(res){
        const sql = 'SELECT * FROM home'

        conexao.query(sql, (erro, resultados) =>{
            if (erro) {
               res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
    buscaPorId(id, res){
        const sql = `SELECT * FROM home WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const home = resultados[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(home)
            }
        })
    }
}
module.exports = new Home
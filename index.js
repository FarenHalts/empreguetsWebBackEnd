const cors = require('cors')
const customExpress = require('./config/customExpress')
const conexao = require('./infra/conexao')
const Tabelas = require('./infra/tabelas')
 

conexao.connect(erro => {
    if (erro) {
        console.log(erro);
    } else {
        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, () => console.log('To rodando'));
    }
})
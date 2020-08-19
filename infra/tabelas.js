class Tabelas {
    init(conexao) {
        console.log('To chamando as tabelas cachorro');
        this.conexao = conexao

        this.criarTestes()
    }

    criarTestes() {
        const sql = 'CREATE TABLE IF NOT EXISTS Home (id int NOT NULL AUTO_INCREMENT, nome varchar(50) NOT NULL, foto varchar(200) NOT NULL, PRIMARY KEY(id))'
        this.conexao.query(sql, erro => {
            if (erro) {
                console.log(erro);
                
            } else {
                console.log('Tabela criada cachorro');
            }
        })
    }
}

module.exports = new Tabelas
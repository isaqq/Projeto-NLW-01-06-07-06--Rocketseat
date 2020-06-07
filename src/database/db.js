// importar a dependencia do sqlite 3
//verbose () é para infomr que eu quero mesagem quando algo for feito um feedback
const sqlite3 = require("sqlite3").verbose()

//inicar obj que ira fzer operações no BD
//sqlite3.Database("/src/database/database.db") isos aqui é uma classe ou constructor
const db = new sqlite3.Database("./src/database/database.db")
//pra cirar o banco, la no git tem que rodar o db.js pelo node



module.exports = db

//vamos utilizar o obj de BD para as operações
//serialize vai rodar uma sequencia de codigos, apenas

 /*db.serialize(() => {
    //vamos criar tabelas
    /* db.run(`
        CREATE TABLE IF NOT EXISTS place (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            a2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // dps vamos criar inserts
    const query = `
        INSERT INTO place (
            image,
            name,
            address,
            a2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);`
        
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
        "Paper Sider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, lámpadas"
    ]

    //essa função ai é um callback, ou seja, ela demora um poquinho pra ser executada porem o programa nao para pra esperar ela
    //o programa fica fazendo o que tem que fazer enquando ela leva o tempo dela e dps ela é execurtada normalmente
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("deu td certo")
        console.log(this)
    }

    db.run(query, values, afterInsertData)


    //dps selecions
    db.all(`SELECT name FROM place`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("aqui está os seus registros: ")
        console.log(rows)

    }) */



    
    // dps deletes

      /* db.run(`DELETE FROM place WHERE id = ?`, [], function(err){
        if(err){
            return console.log(err)
        }
        console.log("registro deletado com sucesso: ")
        
    })  */

/*}) */

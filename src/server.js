const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar a public

server.use(express.static("public"))

//aqui habilitamos o uso do req.body n aplicação
server.use(express.urlencoded({extended: true}))



//utilar o template engine
//noCache é para nao guardar nada o cache
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//prcisamos confugurar caminhos da aplicação

//pagina inicial
//req: é uma resquisição, pedido
//res: é uma resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "blablabla"} )
})

server.get("/create-point", (req, res) => {
    //req.query pega os query strings da url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
    //req.body: retorna o corpo do formulario
    //console.log(req.body)

    //iserir dados no banco de dados

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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.a2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    //essa função ai é um callback, ou seja, ela demora um poquinho pra ser executada porem o programa nao para pra esperar ela
    //o programa fica fazendo o que tem que fazer enquando ela leva o tempo dela e dps ela é execurtada normalmente
    function afterInsertData(err){
        if(err){
             console.log(err)
             return res.render("create-point.html", {error: true})

        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {salvo: true})
    }

    db.run(query, values, afterInsertData)

})







server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search.html", {total: 0})
    }





    //vamos pegar os dados do banco de dados
    // LIKE é para qqr coisa parecida com o que for escrito
    //as % % sao para qqr coisa que vier antes ou depois do que for procurado
    db.all(`SELECT * FROM place WHERE city LIKE '%${search}%'`, function (err, rows){
        if(err){
            return console.log (err)
        }

        const total = rows.length
       
        //isso mostra a pg com os dados la do banco
        return res.render("search.html", {place: rows, total: total})
    } )

    
})


//ligar o servidor
server.listen(3000)
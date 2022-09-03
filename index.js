const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const perguntaModel = require("./database/Pergunta");
const respostaModel = require("./database/Resposta");

connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com o banco de dados!');
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
 
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/", (request, response) => {
  perguntaModel.findAll({ raw: true, order: [
    ['id','DESC']
  ]}).then(perguntas => {
    response.render("index", {
      perguntas: perguntas
    });
  });
});

app.get("/perguntar", (request, response) => {
  response.render("perguntar");
});

app.post("/salvarpergunta", (request, response) => {
  let titulo = request.body.titulo;
  let descricao = request.body.descricao;
  perguntaModel.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    response.redirect("/");
  });
});

app.get("/pergunta/:id", (request, response) => {
  let id = request.params.id;
  perguntaModel.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined) {
      respostaModel.findAll({
        where: {id_pergunta: pergunta.id},
        order: [
          ['id', 'DESC']
        ]
      }).then(respostas => {
        response.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      });
    } else {
      response.redirect("/");
    }
  })
});

app.post("/responder", (request, response) => {
  let corpo = request.body.corpo;
  let perguntaId = request.body.pergunta;

  respostaModel.create({
    corpo: corpo,
    id_pergunta: perguntaId
  }).then(() => {
    response.redirect("/pergunta/"+perguntaId);
  });
});

app.listen(3333, () => { console.log("App rodando!"); });
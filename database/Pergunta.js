const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{
  titulo: {
    type: Sequelize.STRING,
    allowNot: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNot: false
  }
});

Pergunta.sync({force: false}).then(() => { console.log('Tabela perguntas criada!')});
module.exports = Pergunta;
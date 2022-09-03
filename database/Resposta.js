const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  id_pergunta: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Resposta.sync({force: false}).then(() =>{ console.log('tabela respostas criada!') });
module.exports= Resposta;
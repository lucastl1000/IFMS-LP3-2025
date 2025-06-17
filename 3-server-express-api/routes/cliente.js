// Importar os módulos
const express = require('express');
const routes = express.Router();
// importa a conexão com o banco de dados
const db = require('../db/connect');

// GET (Read)
// Rota para obter (Read) os dados no BD
routes.get('/', async(req, res) => {
  // realiza a consulta no banco de dados
  //usando uma query SQL buscando os dados
  // da tabela cliente
  const result = await
  db.query('SELECT * FROM cliente');
  res.status(200).json(result.rows);
});

// POST (Create)
// Rota para criar (Create) novos valores no BD
routes.post('/', async(req, res) => {

  const {nome,email,telefone,endereco,cidade,uf} = req.body;

  if(!nome || !email || !telefone || !endereco || !cidade || !uf){
    return res.status(400).json({
      mesagem: 'Todos os campos são obrigatórios'});
  }

  const sql = `INSERT INTO cliente (nome,email,telefone,endereco,cidade,uf)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  
  const valores = [nome, email, telefone, endereco, cidade, uf];
  const result = await db.query(sql,valores);


  res.status(201).json(result.rows[0]);
});

// PUT (Update)
// Rota para atualizar (Update) valores no BD
routes.put('/', (req, res) => {
  res.status(200).send('/cliente (PUT)');
});

// DELETE (Delete)
// Rota para excluir (Delete) valores do BD
routes.delete('/', (req, res) => {
  res.status(200).send('/cliente (DELETE)');
});

// Exportar o módulo com as rotas
module.exports = routes;
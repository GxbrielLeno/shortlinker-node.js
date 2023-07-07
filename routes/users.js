var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Esta rota trata a requisição GET para '/'
  // e retorna uma resposta com o texto 'respond with a resource'
  res.send('respond with a resource');
});

module.exports = router;

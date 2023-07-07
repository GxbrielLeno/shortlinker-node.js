var express = require('express');
var router = express.Router();
const Link = require('../models/link')

router.get('/:code', async (req, res, next) => {
  const code = req.params.code;

  // Procura o link no banco de dados com base no código fornecido
  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);

  // Incrementa o contador de acessos
  resultado.hits++;
  await resultado.save();

  // Redireciona o usuário para a URL original do link
  res.redirect(resultado.url);
})

router.get('/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  
  // Procura o link no banco de dados com base no código fornecido
  const resultado = await Link.findOne({ where: { code } });
  if (!resultado) return res.sendStatus(404);

  // Renderiza a página de estatísticas e passa os dados do link para a visualização
  res.render('stats', resultado.dataValues);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  // Renderiza a página inicial com o título "ShortLinker"
  res.render('index', { title: 'ShortLinker' });
});

// Gera o código de 4 digitos da url encurtada
function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  
  // Gera um código aleatório para o novo link
  const code = generateCode();

  // Cria um novo link no banco de dados com a URL e o código gerado
  const resultado = await Link.create({
    url,
    code
  });

  // Renderiza a página de estatísticas para o novo link criado
  res.render('stats', resultado.dataValues);
})

module.exports = router;

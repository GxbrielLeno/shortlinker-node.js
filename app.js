var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Configuração do mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definição das rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Captura de erros 404 e repasse para o tratador de erros
app.use(function(req, res, next) {
  next(createError(404));
});

// Tratador de erros
app.use(function(err, req, res, next) {
  // Define as variáveis locais para a mensagem de erro e o objeto de erro
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

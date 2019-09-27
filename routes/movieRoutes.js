const movieController = require('../controllers/moviesController');
const express = require('express');
const appMovie = express();

appMovie.get('/listar', movieController.list);
appMovie.post('/crear', movieController.create);
appMovie.put('/update', movieController.update);
appMovie.delete('/borrar', movieController.borrar);

module.exports = appMovie;
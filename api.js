const express = require('express');
const api = express();
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

//aquí se expecifican las rutas de los objetos a consultar
api.use('/users',userRoutes);
api.use('/movies', movieRoutes);
//api.get('/pruebas', function(req.res)){}

module.exports = api;
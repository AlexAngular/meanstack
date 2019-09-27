
const express = require('express');
const apUser = express.Router();
const userController = require('../controllers/userController');
const jwtProteger = require('../middleware/jwtMiddleware');

    //RUTAS

    apUser.post('/login', userController.login);
    
    apUser.post('/crear', userController.crear);
    //Rutas protegidas
    apUser.use(jwtProteger.protegerRutas);
    apUser.get('/listar',userController.listar);
    apUser.put('/update', userController.update);
    apUser.put('/updatePassword', userController.updatePassword);

    apUser.delete('/borrar', userController.borrar);

    module.exports = apUser;

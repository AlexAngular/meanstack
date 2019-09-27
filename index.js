const mongoose = require('mongoose');
const express = require('express');
const app = express();
const apiRoutes = require('./api');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/curso-mean-stack', {useNewUrlParser: true}).then(() => {
        console.log("Conexión con éxito");

    app.use('/',apiRoutes);
      //puerto
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!');
      });
    }).catch(error => {
        console.log("error inesperado", error);
        
    });
/* 
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow')); */

console.log("Mi primer mensaje desde node");

//commit
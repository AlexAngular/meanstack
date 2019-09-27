const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtToken = require('../helpers/jwtHelper')


function listar(req, res){
   user.find({}, function(error, respUser) {
    if(error){
        return res.status(400).json({'error': error, 'message': 'no se ha podido listar usuarios'});
    }
    if(respUser){
        return res.status(200).json({'message': 'lista de usuarios', usuarios : respUser});
    }
   });
}

function crear(req, res){
    
    const usuario = req.body.user;

    let newUser = new user(usuario);
    /*
    var params = req.body;
    
    let newUser = new user({
        //nombre : req.body.nombre
        nombre : params.nombre,
        email :  params.email,
        password : params.password
    });*/
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        
        if(err){
            return res.status(400).json({'message': 'No se ha podido encriptar', newUser});
        }
        if(hash){
            newUser.password = hash;

            newUser.save()
            .then(()=>
            {
                console.log('usuario creado');
                res.status(200).json({'message':'Usuario creado', newUser});
            })
            .catch(error =>{
                console.log("error user", error);
                res.status(400).json({'error': error});
            });
                }
                
            });
}

function update(req, res){
    let id = req.query.id;
    const usuario = req.body.user;

    const protectedUser = {
        nombre : usuario.nombre,
        email : usuario.email,
        role : usuario.role
    }

    user.updateOne({_id: id}, {$set: protectedUser}, function(error, userUpdate){
        if(error){
            return res.status(400).json({error});
        }
        if(userUpdate){
            return res.status(200).json({'message': 'Usuario actualizado', userUpdate});
        }
    }); 
}

function updatePassword(req, res){
    let id = req.query.id;
   
    bcrypt.hash(req.body.password, saltRounds, function(err, hash){

        if(err){
            return res.status(400).json({'error': 'no se ha podido encriptar'});
        }

        if(hash){

            user.updateOne({_id: id}, {$set: {password: hash} }, function(error, userUpdate){
                if(error){
                    return res.status(400).json(error);
                }
                if(userUpdate){
                    return res.status(200).json({'message': 'Password encriptada actualizado', userUpdate});
                }
            });
        }
    });
}

function borrar(req, res){

    let id = req.query.id;

    user.find({_id:id}, function(error, respUser){
        if(error){
            return res.status(400).json({'error': error, 'message': 'no se puede listar usuarios'});

        }
        if(respUser){
            if(respUser.length < 1){
                return res.status(400).json({'error': 'id no existe'});
            }

            user.deleteOne({_id: id}, function(error, deleteUser){
                if(error){
                    return res.status(400).json({'error': 'No se ha podido borrar usuario'});
                }
                if(deleteUser){
                    return res.status(200).json({'message': 'usuario borrado', deleteUser});
                }
            });
        }
    });    
}

function login(req, res){
    let usuario = req.body.user;

    user.findOne({email: usuario.email}, function(error, resp){
        if(error){
            return res.status(400).json({'error find email': error});
        }
        if(resp){
        
            bcrypt.compare(usuario.password, resp.password, function(err, respuesta){
                if(err){
                    return res.status(400).json({'error': err});
                }
                if(respuesta){
                    let token = jwtToken.encode(resp);
                    return res.status(200).json({'message': 'usuario logueado', 'usuario': resp, token});
                }else{
                    //Este else controla cuando no la contra no coincida
                    return res.status(400).json({'error': 'email o password no coindicen'});
                }
            });
        }else{
            return res.status(400).json({'error': 'no se ha encontrado el email'});
        }
    });
} 

module.exports = { 
    updatePassword,
    login,
    listar,
    crear,
    update,
    borrar
}


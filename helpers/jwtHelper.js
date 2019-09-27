const jwt = require('jsonwebtoken');
const clave = "clave_encriptada";

exports.encode = function(user){
    
    let playload = {
        nombre: user.nombre,
        email: user.nombre,
        role: user.role,
        iat: Date.now(),
        exp: (Date.now() + (1000*60*60))
    }

    var token = jwt.sign(playload, clave);

    return token;

}

exports.decode = function(token){
    let respuesta = jwt.decode(token, clave);

    return respuesta;
}
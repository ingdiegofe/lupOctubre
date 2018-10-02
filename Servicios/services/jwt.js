'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_secreta_curso";


exports.createToken = function(user){
  var payload = { //Todos los datos del usuario
    sub: user.id_usuario, //guardar id de la base de datos
    usu: user.nombre,
    tipo: user.id_tipo_usuario,
    name: user.nombres,
    apellido: user.apellidos,
    iat: moment().unix(),
    exp: moment().add(12, 'hours').unix()
  };

  console.log('TOKEN' + JSON.stringify(payload));

  return jwt.encode(payload, secret);
}

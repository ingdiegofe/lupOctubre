var hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers');
var md_auth = require('./middlewares/authenticated');


var config = {
  server: {
    host: '127.0.0.1',
    port: 3010
  }
}

var server = new hapi.Server();
server.connection({
  host: config.server.host,
  port: config.server.port
});




server.register(require('hapi-auth-jwt-simple'), function(err) {

  if (err) {
    console.log("Error => " + err);
  }

  server.auth.strategy('jwt', 'jwt', {
    validateFunc: md_auth.ensureAuth
  });

  server.auth.default('jwt');

  //Modulo de ADMINISTACION

  var login = require('./recursos/AD/login')
  login.init(server, config);

  var usuario = require('./recursos/AD/usuario')
  usuario.init(server, config);

  var persona = require('./recursos/AD/persona')
  persona.init(server, config);

  var prueba = require('./recursos/AD/prueba')
  prueba.init(server, config);

  var pais = require('./recursos/AD/pais')
  pais.init(server, config);

  var admin_empresas = require('./recursos/AD/admin_empresas');
  admin_empresas.init(server, config);

  var admin_usuarios = require('./recursos/AD/admin_usuarios');
  admin_usuarios.init(server, config);

  var admin_personas = require('./recursos/AD/admin_personas');
  admin_personas.init(server, config);

  var admin_noticias = require('./recursos/AD/admin_noticias');
  admin_noticias.init(server, config);

  var noticias = require('./recursos/IN/noticias')
  noticias.init(server, config);

  var categoria = require('./recursos/IN/categoria')
  categoria.init(server, config);

  var empresa = require('./recursos/IN/empresa')
  empresa.init(server, config);
	
  var email = require('./recursos/email')
  email.init(server, config);

  /*
  var compra = require('./recursos/IN/compra')
  compra.init(server, config);
  */

  var compra_pagadito = require('./recursos/IN/compra-pagadito')
  compra_pagadito.init(server, config);

});

server.ext('onPreResponse', corsHeaders);

server.start(function() {
  console.log("Servidor Ejecutandose en:", server.info.uri)
});

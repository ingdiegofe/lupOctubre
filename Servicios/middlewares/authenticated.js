'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave_secreta_curso";
var Hapi = require('hapi');
//var jwt = require('jsonwebtoken');


exports.ensureAuth = function(token, request, callback){

      var tok = token.replace(/['"]+/g,'');
      console.log("TOKEN: " + tok);
      try{

        var payload = jwt.decode(tok, secret);

        return callback(null, true, payload);

      }catch(ex){
          console.log("ERROR:" + ex);

          if(ex=='Error: Token expired'){
            return callback(null,false,{messeg: 'Token expirado.'});
          }
      }



};

exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR persona
    server.route({

        method: 'GET',
        path: '/ad/persona',
        config:{
            auth: 'jwt',
              handler: function(request, reply) {

                  console.log("GET /ad/persona");

                  var fields;
                  var table;
                  var restriction;
                  var order;


                  fields = "*";//atributos de las tablas
                  table = "ad_persona"; //Tabla
                  restriction = " 1 = 1 ";
                  order = "";

      		if (funciones.validaParametro(request.query.id_persona)) {
                      restriction = funciones.concatenarSQL(restriction," and id_persona = " + request.query.id_persona,"" );
                  }
      		if (funciones.validaParametro(request.query.nombres)) {
                      restriction = funciones.concatenarSQL(restriction," and nombres = '" + request.query.nombres+ "'","");
                  }
          if (funciones.validaParametro(request.query.apellidos)) {
                      restriction = funciones.concatenarSQL(restriction," and apellidos = '" + request.query.apellidos+ "'","");
                  }
          if (funciones.validaParametro(request.query.email)) {
                      restriction = funciones.concatenarSQL(restriction," and email = '" + request.query.email+ "'","");
                  }
          if (funciones.validaParametro(request.query.fecha_nacimiento)) {
                    restriction = funciones.concatenarSQL(restriction," and fecha_nacimiento = '" + request.query.fecha_nacimiento+ "'","");
                }
          if (funciones.validaParametro(request.query.dpi)) {
                    restriction = funciones.concatenarSQL(restriction," and dpi = '" + request.query.dpi+ "'","");
                }
          if (funciones.validaParametro(request.query.celular)) {
                    restriction = funciones.concatenarSQL(restriction," and celular = '" + request.query.celular+ "'","");
                }
          if (funciones.validaParametro(request.query.direccion)) {
                    restriction = funciones.concatenarSQL(restriction," and direccion = '" + request.query.direccion+ "'","");
                }
          if (funciones.validaParametro(request.query.genero)) {
                    restriction = funciones.concatenarSQL(restriction," and genero = '" + request.query.colegiado + "'","");
                }




                          manager.show(fields, table, restriction,order, function(result) {
                              if (result.success) {

                                          reply({
                                              success: true,
                                              message: "Consulta Exitosa.(Persona)",
                                              data: {
                                                  body: result.data.rows
                                              }
                                          });
                              } else {
                                  reply({
                                      success: false,
                                      message: "Ocurrio error al consultar persona.",
                                      data: null
                                  });
                              }
                          });
            }
        }
    });
    //FIN - MOSTRAR persona


      /*INICIO - INSERTAR persona */
      server.route({

          method: 'POST',
          path: '/ad/persona',

          config:{
              auth: false,
              handler: function(request, reply) {

                  console.log("POST /ad/persona");

                  var fields;
                  var table;
                  var values;
                  var llave;

                  fields = "";
                  table = "ad_persona";
                  values = "";
                  llave = "id_persona";

      			if (funciones.validaParametro(request.payload.nombres)) {
                      fields = fields + 'nombres';
                      values = funciones.concatenarSQL(values,"'" + request.payload.nombres+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.apellidos)) {
                      fields = fields + ',apellidos';
                      values = funciones.concatenarSQL(values,"'" + request.payload.apellidos+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.email)) {
                      fields = fields + ',email';
                      values = funciones.concatenarSQL(values,"'" + request.payload.email+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.fecha_nacimiento)) {
                      fields = fields + ',fecha_nacimiento';
                      values = funciones.concatenarSQL(values,"'" + request.payload.fecha_nacimiento+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.dpi)) {
                      fields = fields + ',dpi';
                      values = funciones.concatenarSQL(values,"'" + request.payload.dpi+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.celular)) {
                      fields = fields + ',celular';
                      values = funciones.concatenarSQL(values,"'" + request.payload.celular+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.direccion)) {
                      fields = fields + ',direccion';
                      values = funciones.concatenarSQL(values,"'" + request.payload.direccion+ "'",",");
                  }
      			if (funciones.validaParametro(request.payload.genero)) {
                      fields = fields + ',genero';
                      values = funciones.concatenarSQL(values,"'" +request.payload.genero+ "'",",");
                  }



	          if (funciones.validaParametro(request.payload.id)) {
                if(request.payload.id=='58'){
                    manager.addIdentity(fields, table, values, llave,  function(result) {
                        if (result.success) {
                            reply({
                                success: true,
                                message: "Agregacion de persona exitosa.",
                                data: result.data.rows[0].id_persona,
                                lalve: llave
                            });
                        } else {
                            reply({
                                success: false,
                                message: "Error al insertar una persona.",
                                data: null
                            });
                        }
                    });
                  }
                }
              }
        }
      });
      /*FIN - INSERTAR persona */

    /*INICIO - ACTUALIZAR persona */
    server.route({

        method: 'PUT',
        path: '/ad/persona',
        config:{
            auth: 'jwt',
            handler: function(request, reply) {

                console.log("PUT /ad/persona");

                var set;
                var table;
                var restriction;

                set = "";
                table = "ad_persona";
                restriction = "";

                if (funciones.validaParametro(request.payload.nombres)) {
                    set = funciones.concatenarSQL(set, "nombres = '" + request.payload.nombres +"'",",");
                }
                if (funciones.validaParametro(request.payload.apellidos)) {
                    set = funciones.concatenarSQL(set, "apellidos = '" + request.payload.apellidos +"'",",");
                }
                if (funciones.validaParametro(request.payload.email)) {
                    set = funciones.concatenarSQL(set, "email = '" + request.payload.email +"'",",");
                }
                if (funciones.validaParametro(request.payload.fecha_nacimiento)) {
                    set = funciones.concatenarSQL(set, "fecha_nacimiento = '" + request.payload.fecha_nacimiento +"'",",");
                }
                if (funciones.validaParametro(request.payload.dpi)) {
                    set = funciones.concatenarSQL(set, "dpi = '" + request.payload.dpi +"'",",");
                }
                if (funciones.validaParametro(request.payload.celular)) {
                    set = funciones.concatenarSQL(set, "celular = '" + request.payload.celular +"'",",");
                }
                if (funciones.validaParametro(request.payload.direccion)) {
                    set = funciones.concatenarSQL(set, "direccion = '" + request.payload.direccion +"'",",");
                }
                if (funciones.validaParametro(request.payload.colegiado)) {
                    set = funciones.concatenarSQL(set, "colegiado = '" + request.payload.colegiado +"'",",");
                }

                if (funciones.validaParametro(request.payload.id_persona))
                {

                    //Actualizamos fecha de modificación
                    set = funciones.concatenarSQL(set, "fecha_modificacion = now()",",");

                    //Restriccion para actualizacion
                    restriction="id_persona = "+request.payload.id_persona ;

                    manager.update(set, table, restriction, function(result) {
                            if (result.success) {
                                reply({
                                    success: true,
                                    message: "Actualizacion Exitosa.",
                                    data: result.data.rowCount
                                });
                            } else {
                                reply({
                                    success: false,
                                    message: "Error intente mas tarde.",
                                    data: null
                                });
                            }
                        });
              }else{
                reply({
                    success: false,
                    message: "Error no existe restriccion para actualización.",
                    data: null
                });
              }
         }
       }

    });
    /*FIN - ACTUALIZAR persona*/

	    /*INICIO - DELETE persona */
    server.route({

        method: 'DELETE',
        path: '/ad/persona',
        config:{
            auth: 'jwt',
            handler: function(request, reply) {

                console.log("DELETE /ad/persona");

                var table;
                var restriction;

                table = "ad_persona";
                restriction = "";

                if (funciones.validaParametro(request.query.id_persona)) {
                    restriction="id_persona = "+request.query.id_persona ;

                    manager.remove( table, restriction, function(result) {
                        if (result.success) {
                            reply({
                                success: true,
                                message: "Eliminación exitosa.",
                                data: result.data.rowCount
                            });
                        } else {
                            reply({
                                success: false,
                                message: "Error no puede elimarse la persona",
                                data: null
                            });
                        }
                    });
                }else {
                        reply({
                            success: false,
                            message: "Error id de persona invalido",
                            data: null
                        });
                }

            }
      }
    });
    /*FIN - DELETE persona*/
}

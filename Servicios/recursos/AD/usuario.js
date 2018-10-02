exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR USUARIO
    server.route({

        method: 'GET',
        path: '/ad/usuario',
        config:{
            auth: false,
              handler: function(request, reply) {

                  console.log("GET /ad/usuario");

                  var fields;
                  var table;
                  var restriction;
                  var order;

                  fields = "*";//atributos de las tablas
                  table = "ad_usuario "; //Tabla
                  restriction = " 1 = 1 ";
                  order = "";

            			if (funciones.validaParametro(request.query.id_usuario)) {
                            restriction = funciones.concatenarSQL(restriction," and id_usuario = " + request.query.id_usuario,"" );
                        }
            			if (funciones.validaParametro(request.query.nombre)) {
                            restriction = funciones.concatenarSQL(restriction," and nombre = '" + request.query.nombre+ "'","");
                        }
            			if (funciones.validaParametro(request.query.estado)) {
                            restriction = funciones.concatenarSQL(restriction," and estado = " + request.query.estado,"");
                        }
            			if (funciones.validaParametro(request.query.fecha_ingreso)) {
                            restriction = funciones.concatenarSQL(restriction," and fecha_ingreso = '" + request.query.fecha_ingreso+ "'","");
                        }
            			if (funciones.validaParametro(request.query.fecha_creacion)) {
                            restriction = funciones.concatenarSQL(restriction," and fecha_creacion = '" + request.query.fecha_creacion+ "'","");
                        }
            			if (funciones.validaParametro(request.query.fecha_modificacion)) {
                            restriction = funciones.concatenarSQL(restriction," and fecha_modificacion = '" + request.query.fecha_modificacion+ "'","");
                        }
            			if (funciones.validaParametro(request.query.logueado)) {
                            restriction = funciones.concatenarSQL(restriction," and logueado = " + request.query.logueado,"");
                        }
            			if (funciones.validaParametro(request.query.id_rol)) {
                            restriction = funciones.concatenarSQL(restriction," and id_rol = " + request.query.id_rol,"");
                        }
            			if (funciones.validaParametro(request.query.id_persona)) {
                            restriction = funciones.concatenarSQL(restriction," and id_persona = " + request.query.id_persona,"");
                        }


                          manager.show(fields, table, restriction,order, function(result) {
                              if (result.success) {

                                          reply({
                                              success: true,
                                              message: "Consulta Exitosa.(Usuario)",
                                              data: {
                                                  body: result.data.rows
                                              },
                                              existe: result.data.rowCount
                                          });
                              } else {
                                  reply({
                                      success: false,
                                      message: "Error intente mas tarde. (Usuario)",
                                      data: null
                                  });
                              }
                          });
            }
        }
    });
    //FIN - MOSTRAR USUARIO

    //INICIO - MOSTRAR USUARIO registro
    server.route({

        method: 'GET',
        path: '/ad/usuario_registro',
        config:{
            auth: false,
              handler: function(request, reply) {

                  console.log("GET /ad/usuario_registro");

                  var fields;
                  var table;
                  var restriction;
                  var order;

                  fields = "*";//atributos de las tablas
                  table = "ad_usuario "; //Tabla
                  restriction = " 1 = 1 ";
                  order = "";


            			if (funciones.validaParametro(request.query.nombre)) {
                            restriction = funciones.concatenarSQL(restriction," and nombre = '" + request.query.nombre+ "'","");
                        }


                if (funciones.validaParametro(request.query.nombre)) {
                       manager.show(fields, table, restriction,order, function(result) {
                              if (result.success) {

                                          reply({
                                              success: true,
                                              message: "Consulta Exitosa.(Usuario)",
                                              data: {
                                                  body: result.data.rows
                                              },
                                              existe: result.data.rowCount
                                          });
                              } else {
                                  reply({
                                      success: false,
                                      message: "Error intente mas tarde. (Usuario)",
                                      data: null
                                  });
                              }
                          });
                  }
            }
        }
    });
    //FIN - MOSTRAR USUARIO registro



    /*INICIO - INSERTAR USUARIO */
    server.route({

        method: 'POST',
        path: '/ad/usuario',
        config:{
            //auth: false,
            auth: false,
          handler: function(request, reply) {

              console.log("POST /ad/usuario");

              var fields="";
              var table;
              var values;
              var clave = "";

              table = "ad_usuario";
              values = "";

        			if (funciones.validaParametro(request.payload.nombre)) {
                        fields = fields + 'nombre';
                        values = funciones.concatenarSQL(values,"'" + request.payload.nombre+ "'",",");
                    }
        			if (funciones.validaParametro(request.payload.id_persona)) {
                        fields = fields + ',id_persona';
                        values = funciones.concatenarSQL(values, request.payload.id_persona,",");
                    }
        			if (funciones.validaParametro(request.payload.id_rol)) {
                        fields = fields + ',id_rol';
                        values = funciones.concatenarSQL(values, request.payload.id_rol,",");
                    }

        if (funciones.validaParametro(request.payload.nombre)) {
                  bcrypt.hash(request.payload.nombre,null,null, function(err,hash){
                      clave = hash;
                      console.log("ENTRO A HASH");
                      console.log("HASH: " + clave);
                      fields = fields + ',clave';
                      values = funciones.concatenarSQL(values,"'" + clave + "'",",");

                      //console.log("insert into (" + fields + " ) values ( " + values + " )");

                        manager.add(fields, table, values, function(result) {
                            if (result.success) {
                                reply({
                                    success: true,
                                    message: "Agregacion Exitosa.(Usuario)",
                                    data: result.data.rowCount
                                });
                            } else {
                                reply({
                                    success: false,
                                    message: "Error intente mas tarde. (Usuario)",
                                    data: null
                                });
                            }
                        });

                  });

              }

            }
        }
    });
    /*FIN - INSERTAR USUARIO */

    /*INICIO - ACTUALIZAR USUARIO */
    server.route({

        method: 'PUT',
        path: '/ad/usuario',
        config:{
            auth: false,
            handler: function(request, reply) {

                console.log("PUT /ad/usuario");

                var set;
                var table;
                var restriction;

                set = "";
                table = "ad_usuario";
                restriction = "";

                if (funciones.validaParametro(request.payload.nombre)) {
                    set = funciones.concatenarSQL(set, "nombre = '" + request.payload.nombre +"'",",");
                }
                if (funciones.validaParametro(request.payload.estado)) {
                    set = funciones.concatenarSQL(set, "estado = " + request.payload.estado ,",");
                }
          			if (funciones.validaParametro(request.payload.fecha_ingreso)) {
                          set = funciones.concatenarSQL(set, "fecha_ingreso = " + request.payload.fecha_ingreso ,",");
                      }
          			if (funciones.validaParametro(request.payload.logueado)) {
                          set = funciones.concatenarSQL(set, "logueado = '" + request.payload.logueado +"'" ,",");
                      }
          			if (funciones.validaParametro(request.payload.id_rol)) {
                          set = funciones.concatenarSQL(set, "id_rol = "+ request.payload.id_rol,",");
                      }




                if (funciones.validaParametro(request.payload.id_usuario))
                {
                    restriction="id_usuario = "+request.payload.id_usuario ;

                    set = funciones.concatenarSQL(set, "fecha_modificacion = now()",",");

                      console.log("update ad_usuario  set " + set + " where " + restriction );
                    //Si tiene clave INICIO
                    if (funciones.validaParametro(request.payload.clave)) {
                              bcrypt.hash(request.payload.clave,null,null, function(err,hash){
                                  clave = hash;
                                  set = funciones.concatenarSQL(set, "clave = '" + clave +"'",",");

                                  manager.update(set, table, restriction, function(result) {
                                          if (result.success) {
                                              reply({
                                                  success: true,
                                                  message: "Actualizacion usuario exitosa.",
                                                  data: result.data.rowCount
                                              });
                                          } else {
                                              reply({
                                                  success: false,
                                                  message: "Error actualizacion usuario intente mas tarde.",
                                                  data: null
                                              });
                                          }
                                    });

                              });
                    //si tiene clave FIN
                  }else{
                    manager.update(set, table, restriction, function(result) {
                            if (result.success) {
                                reply({
                                    success: true,
                                    message: "Actualizacion usuario Exitosa.",
                                    data: result.data.rowCount
                                });
                            } else {
                                reply({
                                    success: false,
                                    message: "Error actualizacion de usuario intente mas tarde.",
                                    data: null
                                });
                            }
                        });
                    }
              }else{
                reply({
                    success: false,
                    message: "Error id del usuario incorrecto.",
                    data: null
                });
              }
         }
       }

    });
    /*FIN - ACTUALIZAR USUARIO*/

	    /*INICIO - DELETE usuario */
    server.route({

        method: 'DELETE',
        path: '/ad/usuario',
        config:{
            auth: false,
            handler: function(request, reply) {

                console.log("DELETE /ad/usuario");

                var table;
                var restriction;

                table = "ad_usuario";
                restriction = "";

                if (funciones.validaParametro(request.query.id_persona)) {
                    restriction="id_persona = "+request.query.id_persona ;

                manager.remove( table, restriction, function(result) {
                    if (result.success) {
                        reply({
                            success: true,
                            message: "Delete usuario Exitosa.",
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
            }else {
                        reply({
                            success: false,
                            message: "Id usuario invalido",
                            data: null
                        });
                    }

            }
      }
    });
    /*FIN - DELETE cuenta*/
}

exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');
    var jwt = require('../../services/jwt');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR usuario
    server.route({

        method: 'POST',
        path: '/login',
        config:{
            auth: false,
        handler: function(request, reply) {

            console.log("POST /login");

            var fields;
            var table;
            var restriction;
            var order="";
            var validacion = "";
            var clave="";




            fields = "*";//atributos de las tablas
            table = "ad_usuario "; //Tabla
            restriction = "";

			if (funciones.validaParametro(request.payload.nombre)) {
                restriction = funciones.concatenarSQL(restriction," nombre = '" + request.payload.nombre+ "'","");
                clave = request.payload.clave;
      }

      console.log("select " + fields + " from " + table + " where " + restriction);

            manager.show(fields, table, restriction,order, function(result) {
                if (result.success) {
                      console.log(result.data.rows[0]);
                      if(!result.data.rows[0]){
                        reply({
                            success: false,
                            message: "Usuario o contraseña incorrecta.",
                            codigo: 4,
                        });
                      }else {

                        bcrypt.compare(clave, result.data.rows[0].clave,function(err,check){
                          if(check){

                            if(request.payload.gethash == "true"){
                                  reply({
                                      success: true,
                                      message: "Consulta Exitosa.",
                                      codigo: 1,
                                      data: {
                                          body:{
                                            id_usuario: result.data.rows[0].id_usuario,
                                            nombre: result.data.rows[0].nombre,
                                            clave: result.data.rows[0].clave,
                                            estado: result.data.rows[0].estado,
                                            fecha_ingreso: result.data.rows[0].fecha_ingreso,
                                            logeado: result.data.rows[0].logeado,
                                            nombres: result.data.rows[0].nombres,
                                            apellidos: result.data.rows[0].apellidos,
                                            dpi: result.data.rows[0].dpi,
                                            id_tipo_usuario: result.data.rows[0].id_rol,
                                            reinicio: result.data.rows[0].reinicio,
                                            token: jwt.createToken(result.data.rows[0])
                                          }
                                      }
                                  });
                            }else{
                              console.log("no exito");
                                  reply({
                                      success: true,
                                      codigo: 2,
                                      message: "El usuario no ha podido loguearse.",
                                      data: {
                                          body: result.data.rows
                                      }
                                  });
                            }

                          }else {
                            console.log("Contraseña Incorrecta");
                            reply({
                                success: false,
                                codigo: 3,
                                message: "Usuario o contraseña incorrecta.",
                            });
                          }
                        })
                    }

                } else {
                    reply({
                        success: false,
                        message: "Error intente mas tarde",
                    });
                }
            });
          }
        }
    });
    //FIN - MOSTRAR cuenta
}

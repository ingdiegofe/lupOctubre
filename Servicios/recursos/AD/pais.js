exports.init = function(server) {

  var manager = require('../../BD/manager');
  var options = require('../../BD/options');
  var funciones = require('../../Funciones/funciones');

    //INICIO - MOSTRAR departamento
    server.route({

        method: 'GET',
        path: '/ad/pais',
        config:{
            auth: false,
                handler: function(request, reply) {

                    console.log("GET /ad/pais");

                    var fields;
                    var table;
                    var restriction;
                    var order;
                    var validacion = "";

                    fields = " * ";//atributos de las tablas
                    table = "ad_pais"; //Tabla
                    restriction = " 1 = 1 ";
                    order = "nombre";

        			if (funciones.validaParametro(request.query.id_departamento)) {
                        restriction = funciones.concatenarSQL(restriction," and id_pais = " + request.query.id_pais,"" );
                    }
        			if (funciones.validaParametro(request.query.departamento)) {
                        restriction = funciones.concatenarSQL(restriction," and nombre = '" + request.query.nombre+ "'","");
                    }


                            manager.show(fields, table, restriction,order, function(result) {
                                if (result.success) {

                                            reply({
                                                success: true,
                                                message: "Consulta Exitosa (Pais).",
                                                data: {
                                                    body: result.data.rows
                                                }
                                            });
                                } else {
                                    reply({
                                        success: false,
                                        message: "Error intente mas tarde (Pais)",
                                        data: null
                                    });
                                }
                            });

                }
        }
    });
    //FIN - MOSTRAR cuenta

}

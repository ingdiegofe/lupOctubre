exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR Empresa
    server.route({

        method: 'GET',
        path: '/in/empresa',
        config:{
            auth: 'jwt',
            handler: function(request, reply) {

            console.log("GET /in/empresa");

            var fields;
            var table;
            var restriction = "1 = 1";
            var order;
            var validacion = "";
            var query;

            fields = " * ";//atributos de las tablas
            table = " ad_empresa " ;

            order = "";

            if (funciones.validaParametro(request.query.categoria)) {
                    restriction = funciones.concatenarSQL(restriction," and categoria = " + request.query.categoria ,"" );
           }

           if (funciones.validaParametro(request.query.nombre)) {
                   restriction = funciones.concatenarSQL(restriction," and nombre like '%" + request.query.nombre + "%'","" );
         }

            query = " select " + fields + " from " + table + "where "+ restriction + " order by fecha_creacion desc limit 50 ";

               console.log(query);

                    manager.Correr(query, function(result) {
                        if (result.success) {

                                    reply({
                                        success: true,
                                        message: "Consulta Exitosa.",
                                        data: {
                                            body: result.data.rows
                                        }
                                    });
                        } else {
                            reply({
                                success: false,
                                message: "Error intente mas tarde",
                                data: null
                            });
                        }
                    });
          }
        }
    });
    //FIN - MOSTRAR Empresa






}

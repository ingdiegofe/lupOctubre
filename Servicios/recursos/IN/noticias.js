exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR Noticia
    server.route({

        method: 'GET',
        path: '/in/noticia',
        config:{
            auth: 'jwt',
            handler: function(request, reply) {

            console.log("GET /in/noticia");

            var fields;
            var table;
            var restriction = "1 = 1";
            var order;
            var validacion = "";
            var query;

            fields = " * ";//atributos de las tablas
            table = " ad_noticia " ;

            order = "";

            query = " select " + fields + " from " + table + "where "+ restriction + " order by fecha_creacion desc limit 50 ";

               //console.log(" select " + fields + " from " + table + " where " + restriction);

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
    //FIN - MOSTRAR Noticia






}

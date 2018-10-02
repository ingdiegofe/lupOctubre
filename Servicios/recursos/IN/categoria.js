exports.init = function(server) {

    var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');

    var bcrypt = require('bcrypt-nodejs');

    //INICIO - MOSTRAR Categoria
    server.route({

        method: 'GET',
        path: '/in/categoria',
        config:{
            auth: 'jwt',
            handler: function(request, reply) {

            console.log("GET /in/categoria");

            var fields;
            var table;
            var restriction = "1 = 1";
            var order;
            var validacion = "";
            var query;

            fields = " cat.*, count(emp.categoria) cant ";//atributos de las tablas
            table = " ad_categoria_empresa cat " +
			              " left join ad_empresa emp on cat.id_categoria_empresa = emp.categoria " ;

            order = "";

            if (funciones.validaParametro(request.query.nombre)) {
                    restriction = funciones.concatenarSQL(restriction," and cat.nombre like '%" + request.query.nombre + "%'","" );
          }

            query = " select " + fields + " from " + table + "where "+ restriction + " group by  emp.categoria, cat.id_categoria_empresa order by cat.nombre ";

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
    //FIN - MOSTRAR Categoria






}

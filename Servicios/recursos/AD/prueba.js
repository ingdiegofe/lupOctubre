
exports.init = function(server) {
	
	var manager = require('../../BD/manager');
    var options = require('../../BD/options');
    var funciones = require('../../Funciones/funciones');
	
	var bcrypt = require('bcrypt-nodejs');
	
	server.route({
		method: 'GET',
		path: '/ad/prueba',
		 config:{
            auth: false,
			handler: function(request, reply) {
				manager.testConnection(function(result){
					if(!result.success){
						reply({
							message: "Error => " + result.message
						});
					}else{
						reply({
							message: "Ok => " + result.message
						});
					}
				});
			}
		 }
	});
	
}
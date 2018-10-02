exports.init = function(server) {

var dbManager = require('../../BD/manager');
var options = require('../../BD/options');
var bcrypt = require('bcrypt-nodejs');
var funciones = require('../../Funciones/funciones');
var bitacora = require('../../Funciones/bitacora');

var Reply;

server.route({
	method: 'POST',
	path: '/compra-pagadito/iniciar-compra',
	config: {
	  auth: 'jwt',
	  handler: IniciarCompra
	}
});


function IniciarCompra(request, reply){
    Reply = reply;
    cantidad = request.payload.compra.cantidad;
    precio = request.payload.compra.precio;
    total = cantidad * precio;
    let usuario = request.payload.compra.usuario_modifica;

    console.log("JSON compra => " + JSON.stringify(request.payload.compra));

    // Registrar estado 1 (inicio) de compra
    let _strSQL = "INSERT INTO ad_compra(fecha_compra, usuario, estado, mensaje, cantidad, precio, total) " + 
        "values(now(), " + usuario + ", 1, 'Gestión de compra inicializada', " + 
                cantidad + ", " + precio + ", " + total + ") " + 
        "returning id_compra";
    
    dbManager.Correr(_strSQL, cbRegistrarInicioCompra);    
}

function cbRegistrarInicioCompra(result){
    if(!result.success){
        console.log(result.err);
        bitacora.error(result.err);
        Reply({ code: 0, message: "Error inicializando pago, intente nuevamente más tarde" });
    }else{
        // Pago inicializado en base de datos
        Reply({ code: 1, message: "Pago inicializado exitosamente" });
    }
}

}
exports.init = function(server) {

var dbManager = require('../../BD/manager');
var options = require('../../BD/options');
var bcrypt = require('bcrypt-nodejs');
var funciones = require('../../Funciones/funciones');
var bitacora = require('../../Funciones/bitacora');
const paypal = require('paypal-rest-sdk');

var Reply;
var Cantidad;
var Precio;
var Total;
var IdCompra;
var UrlAprobado;

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQOPqi6jan0G1VxEqwTvg8BlIplGM6AEX2hSPncmwGuQuFLbwXLplZlNhw2g3RM8og2pj-z7BrUGxGc0',
    'client_secret': 'EH77Rc-EnnX2e8CTwnozv68pn2kyREyvPZe6_F0_0cfAfdE5rpypiVxYGuocAijZlvi4E21cEzdR_BBy'
  });

// #########################################  INICIAR PROCESO DE COMPRA  #########################################


server.route({
	method: 'POST',
	path: '/compra/iniciar-compra',
	config: {
	  auth: 'jwt',
	  handler: IniciarCompra
	}
});

function IniciarCompra(request, reply){
    Reply = reply;
    Cantidad = 100;
    Precio = 15.00;
    Total = Cantidad * Precio;
    let usuario = 2;

    // Registrar estado 1 (inicio) de compra
    let _strSQL = "INSERT INTO ad_compra(fecha_compra, usuario, estado, mensaje, total) " + 
        "values(now(), " + usuario + ", 1, 'Gestión de compra inicializada', " + Total + ") " + 
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
        //Reply({ code: 1, message: "Pago inicializado exitosamente" });
        
        // Obtener id de compra ingresado
        //console.log("Obtener Id => " + JSON.stringify(result.data.rows[0]));
        IdCompra = result.data.rows[0].id_compra;
        //Reply({ code: 1, message: "Compra registrada con Id => " + IdCompra });
        EnviarAutorizacionPagoPaypal();
    }
}

function EnviarAutorizacionPagoPaypal(){
    console.log("###### Pago inicializado ######");
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4042/AuthCompra/exito",
            "cancel_url": "http://localhost:4042/AuthCompra/cancelar"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Acciones Banco Industrial, S.A.",
                    "sku": "001",
                    "price": Precio.toString(),
                    "currency": "USD",
                    "quantity": Cantidad.toString()
                }]
            },
            "amount": {
                "currency": "USD",
                "total": Total.toString()
            },
            "description": "Adquisición de acciones de empresa Banco Industrial S.A."
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            bitacora.error(error.response);//console.log(error.response);
            Reply({ code: 0, message: "Error autorizando pago en Paypal, favor intentar nuevamente" });
        } else {
            console.log(payment);
            for(let i = 0; i < payment.links.length; i++){
                if(payment.links[i].rel=="approval_url") UrlAprobado = payment.links[i].href;
            }
            if(UrlAprobado==""){
                Reply({ code: 0, message: "Error autorizando pago en Paypal, favor intentar nuevamente" });
            }else{
                //Reply({ code: 1, url: _urlAprobado, message: "Autorización de pago exitosa" });
                let _strSQL = "UPDATE   ad_compra " + 
                    "SET    estado = 2, " + 
                    "       mensaje = 'Pago pre aprobado exitosamente', " + 
                    "       trama_respuesta = '" + JSON.stringify(payment) + "' " + 
                    "WHERE  id_compra = " + IdCompra;
    
                dbManager.Correr(_strSQL, cbRegistrarPreAutorizacionCompra);
            }
        }
    });
}

function cbRegistrarPreAutorizacionCompra(result){
    if(!result.success){
        bitacora.error(result.err);
        Reply({ code: 0, message: "Error registrando pre autorización de pago, favor intentar nuevamente" });
    }else{
        Reply({ code: 1, url: UrlAprobado, message: "Pago pre autorizado exitosamente" });
    }
}


}


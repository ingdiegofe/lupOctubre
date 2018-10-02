
exports.init = function(server) {

    var manager = require('../BD/manager');
    var options = require('../BD/options');
    var funciones = require('../Funciones/funciones');
    var md_auth = require('../middlewares/authenticated');


    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'diego.fernandez.58@gmail.com',
        pass: 'Ingenieria2008'
      }
    });


    /*INICIO - Envio correo */
    server.route({

        method: 'POST',
        path: '/correo',
        config:{
            auth: false,
            handler: function(request, reply) {

                console.log("POST /correo");

                var strNombre = "";
                var strEmail = "";
                var strTelefono = "";
                var strAsunto ="";
                var strMensaje = "";
                var strMensajeEnvio = "";
                var img;

                img = funciones.logo();

          			if (funciones.validaParametro(request.payload.nombre)) {
                  strNombre = request.payload.nombre;
                }
          			if (funciones.validaParametro(request.payload.email)) {
                  strEmail = request.payload.email;
                }
                if (funciones.validaParametro(request.payload.telefono)) {
                  strTelefono = request.payload.telefono;
                }
          			if (funciones.validaParametro(request.payload.asunto)) {
                  strAsunto = request.payload.asunto;
                }
                if (funciones.validaParametro(request.payload.mensaje)) {
                  strMensaje = request.payload.mensaje;
                }

                strMensajeEnvio = '<html>' +
                                  '<head>' +
                                  '</head>' +
                              		'<body>' +
                              			'<div style="background-color:#E6E6E6; padding: 20px 20px;">' +
                              				'<div style="background-color: white; padding: 20px 20px;">' +
                              					'<h2>LUP</h2>' +
                              					 img +
                              					'<img src="cid:logo_red" style="width:50px;"/> ' +
                              					'<br/>' +
                              					'<h3>¡El siguiente mensaje ha sido enviado por un cliente!</h3>' +
                              					'<br/>' +
                              					'<p>' +
                              						'Datos: ' +
                              						'<br/>' +
                              						'<br/>' +
                                          "<table>" +

                                            "<tr>" +
                                              "<td>Nombre:</td>" +
                                              "<td>" + strNombre + "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                              "<td>Email:</td>" +
                                              "<td>" + strEmail + "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                              "<td>Teléfono:</td>" +
                                              "<td>" + strTelefono + "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                              "<td>Mensaje:</td>" +
                                              "<td>" + strMensaje + "</td>" +
                                            "</tr>" +

                                          "</table>" +
                              						'<br/>' +
                            					'</p>' +
                              				'</div>' +
                              				'<br/>' +
                              				'<br/><br/>' +
                              				'<center>'+
                              					'<p>@2018 LUP Guatemala </p>'+
                                        '<p><a href="www.gmail.com"> www.lup.com </a><p>' +
                              				'</center>' +
                              			'</div>' +
                              		'</body>' +
                              		'</html>';


               var mailOptions = {
                  from: 'diego.fernandez.58@gmail.com',
                  to: 'diego.fernandez.58@gmail.com',
                  subject: strAsunto,
                  html: strMensajeEnvio
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log("Error: " + error);
                    reply({
                        success: false,
                        message: "Error email:" + error,
                        data: {
                            body: 'Error al enviar correo.'
                        }
                    });
                  } else {
                    console.log('Correo enviado con exito.');
                    reply({
                        success: true,
                        message: "Correo enviado con exito",
                        data: {
                            body: 'Correo recibido con exito.'
                        }
                    });
                  }
                });

            }
        }
    });
    /*FIN - INSERTAR correo */


}

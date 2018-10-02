exports.init = function(server) {

var dbManager = require('../../BD/manager');
var options = require('../../BD/options');
var funciones = require('../../Funciones/funciones');
var bcrypt = require('bcrypt-nodejs');
var funciones = require('../../Funciones/funciones');
var Noticia;
var Reply;


// #########################################  INFORMACION DE NOTICIA  #########################################

server.route({
	method: 'POST',
	path: '/admin-noticias/info-noticia',
	config: {
	  auth: 'jwt',
	  handler: InformacionNoticia
	}
});

function InformacionNoticia(request, reply){
	Reply = reply;
	_strSQL = 	"SELECT 	id_noticia, titulo, texto, " +
		"to_char(fecha_modificacion, 'yyyy/MM/dd hh:mm:ss') as fecha_modificacion, " +
		"to_char(fecha_creacion, 'yyyy/MM/dd hh:mm:ss') as fecha_creacion  " +
		"FROM 	ad_noticia " +
		"WHERE	id_noticia = " + request.payload.idnoticia;
		console.log(_strSQL);
		dbManager.Correr(_strSQL, cbInformacionNoticia);
}

function cbInformacionNoticia(result){
	if (!result.success) {
		console.log(result.err);
		Reply({ code: 0, message: "Error obteniendo información de noticia" });
	} else {
		Reply({ code: 1, message: "Información obtenida exitosamente", body: { noticia: result.data.rows } });
	}
}


// #########################################  MODIFICAR NOTICIA  #########################################

server.route({
	method: 'POST',
	path: '/admin-noticias/actualizar-noticia',
	config: {
	  auth: 'jwt',
	  handler: ModificarNoticia
	}
});


function ModificarNoticia(request, reply){
	Reply = reply;
	Noticia = request.payload.noticia;
	// Validar parametros obligatorios para actualización
	if( !funciones.validaParametro(Noticia.titulo) ||
			 !funciones.validaParametro(Noticia.texto)
	){
	 Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.noticia) });
	}
	let _strSQLSet = " titulo = '" + Noticia.titulo + "', " +
									 " texto = '" + Noticia.texto + "', ";

	// Colocar parametros internos de actualizacion
	_strSQLSet += "fecha_modificacion = now(), " +
								"usuario_modifica = 1";

	dbManager.update(_strSQLSet, 'ad_noticia', "id_noticia = " + Noticia.id_noticia, cbActualizarNoticia);

}

function cbActualizarNoticia(result){
	if(!result.success){
		Reply({ code: 0, message: "Error actualizando noticia" });
	}else{
		Reply({ code: 1, message: "Noticia actualizada exitosamente" });
	}
}

// #########################################  AGREGAR NOTICIA  #########################################

server.route({
	method: 'POST',
	path: '/admin-noticias/agregar-noticia',
	config: {
	  auth: 'jwt',
	  handler: AgregarNoticia
	}
});

function AgregarNoticia(request, reply) {
	Reply = reply;
	Noticia = request.payload.noticia;
	// Validar parametros obligatorios
	if ( !funciones.validaParametro(Noticia.titulo) ||
			 !funciones.validaParametro(Noticia.texto)
	) {
	  Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.noticia) });
	} else {
		let _strCampos = "titulo, texto, imagen, fecha_creacion, fecha_modificacion, usuario_modifica";
		let _strValores = "'" + Noticia.titulo + "', '" + Noticia.texto + "','imagendummy.png', now(), now(), 1";
		dbManager.add(_strCampos, "ad_noticia", _strValores, cbAddNoticia);
	}
}

function cbAddNoticia(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error agregando noticia" });
	} else {
		Reply({ code: 1, message: "Noticia agregada exitosamente" });
	}
}


// #########################################  BORRAR NOTICIA  #########################################

server.route({
	method: 'POST',
	path: '/admin-noticias/borrar-noticia',
	config: {
	  auth: 'jwt',
	  handler: BorrarNoticia
	}
});

function BorrarNoticia(request, reply){
	Reply = reply;
	IdNoticia = request.payload.idnoticia;
	dbManager.remove('ad_noticia', 'id_noticia = ' + IdNoticia, cbBorrarNoticia);
}

function cbBorrarNoticia(result){
	if(!result.success){
		Reply({ code: 0, message: "Error eliminando noticia" });
	}else{
		Reply({ code: 1, message: "Noticia eliminada exitosasemente" });
	}
}


// #########################################  LISTA DE NOTICIAS  #########################################

server.route({
	method: 'GET',
	path: '/admin-noticias/lista-noticias',
	config: {
	  auth: 'jwt',
	  handler: ListaNoticias
	}
});

function ListaNoticias(request, reply) {
	Reply = reply;
	_strSQL = 	"SELECT N.id_noticia, N.titulo, to_char(N.fecha_modificacion, 'yyyy/MM/dd hh:mm:ss') as fecha_modificacion, U.nombre AS usuario_modifica " +
				"FROM ad_noticia N, ad_usuario U " +
				"WHERE N.usuario_modifica = U.id_usuario ";
	console.log()
	dbManager.Correr(_strSQL, cbListaNoticias);
}

function cbListaNoticias(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error obteniendo listado de noticias" });
	} else {
		Reply({ code: 1, message: "Noticias obtenidas exitosamente", data: { body: result.data.rows } });
	}
}



}

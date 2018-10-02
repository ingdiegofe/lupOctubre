exports.init = function(server) {

var dbManager = require('../../BD/manager');
var options = require('../../BD/options');
var funciones = require('../../Funciones/funciones');
var bcrypt = require('bcrypt-nodejs');
var funciones = require('../../Funciones/funciones');
var Usuario;
var Reply;
var bitacora = require('../../Funciones/bitacora');
var IdPersona;

// #########################################  BORRAR PERSONA  #########################################

server.route({
	method: 'POST',
	path: '/admin-personas/borrar-persona',
	config: {
	  auth: 'jwt',
	  handler: BorrarPersona
	}
});

function BorrarPersona(request, reply){
	Reply = reply;
	IdPersona = request.payload.idpersona;

	// Quitar persona de todos los usuarios
	let _strSQL = "UPDATE ad_usuario SET id_persona = null WHERE id_persona = " + IdPersona;
	dbManager.Correr(_strSQL, cbQuitarPersonaDeUsuarios);

}

function cbQuitarPersonaDeUsuarios(result){
	if(!result.success){
		Reply({ code: 0, message: "Error quitando persona de usuarios" });
	}else{
		// remove(table, restriction, reply)
		dbManager.remove('ad_persona', 'id_persona = ' + IdPersona, cbBorrarPersona);
	}
}

function cbBorrarPersona(result){
	if(!result.success){
		Reply({ code: 0, message: "Error eliminando persona" });
	}else{
		Reply({ code: 1, message: "Persona eliminada exitosamente" });
	}
}

// #########################################  ACTUALIZAR PERSONA  #########################################

server.route({
	method: 'POST',
	path: '/admin-personas/actualizar-persona',
	config: {
	  auth: 'jwt',
	  handler: ActualizarPersona
	}
});

function ActualizarPersona(request, reply){
	Reply = reply;
	Persona = request.payload.persona;

	// Validar valores obligatorios
	if (!funciones.validaParametro(Persona.nombres) || !funciones.validaParametro(Persona.apellidos)
		|| !funciones.validaParametro(Persona.email) || !funciones.validaParametro(Persona.fecha_nacimiento)
		|| !funciones.validaParametro(Persona.genero) ) {
	  Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.persona) });
	} else {
		let strSQLSet = " nombres = '" + Persona.nombres + "', ";
		strSQLSet += "apellidos = '" + Persona.apellidos + "', ";
		strSQLSet += "email = '" + Persona.email + "', ";
		strSQLSet += "fecha_nacimiento = '" + Persona.fecha_nacimiento + "', ";
		strSQLSet += "genero = B'" + Persona.genero.toString() + "' ";

		// Agregar valores opcionaes
		if (funciones.validaParametro(Persona.celular)) strSQLSet += ", celular = '" + Persona.celular  + "'";
		if (funciones.validaParametro(Persona.dpi)) strSQLSet += ", dpi = '" + Persona.dpi + "'";
		if (funciones.validaParametro(Persona.direccion)) strSQLSet += ", direccion = '" + Persona.direccion  + "'";
		// Agregar parametros internos
		strSQLSet += ", fecha_modificacion = now() ";

		dbManager.update(strSQLSet, 'ad_persona', "id_persona = " + Persona.id_persona, cbActualizarPersona);
	}
}



function cbActualizarPersona(result){
	if(!result.success){
		Reply({ code: 0, message: "Error actualizando información de persona" });
	}else{
		Reply({ code: 1, message: "Persona actualizada exitosamente" });
	}
}


// #########################################  INFORMACION DE EMPRESA  #########################################

server.route({
	method: 'POST',
	path: '/admin-personas/info-persona',
	config: {
	  auth: 'jwt',
	  handler: InformacionPersona
	}
});

function InformacionPersona(request, reply){
	Reply = reply;
	idpersona = request.payload.idpersona;
	_strSQL = "SELECT id_persona, nombres, apellidos, email, dpi, to_char(fecha_nacimiento, 'yyyy/MM/dd') as fecha_nacimiento, " +
						"celular, direccion, to_char(fecha_modificacion, 'yyyy/MM/dd') as fecha_modificacion, genero::int as genero " +
            "FROM   ad_persona " +
						"WHERE	id_persona = " + idpersona;

	dbManager.Correr(_strSQL, cbInformacionPersona);
}

function cbInformacionPersona(result){
	if (!result.success) {
		console.log(result.err);
		Reply({ code: 0, message: "Error obteniendo información de persona" });
	} else {
		Reply({ code: 1, message: "Información obtenida exitosamente", body: { persona: result.data.rows } });
	}
}


// #########################################  AGREGAR PERSONA  #########################################

server.route({
	method: 'POST',
	path: '/admin-personas/agregar-persona',
	config: {
	  auth: 'jwt',
	  handler: AgregarPersona
	}
});

function AgregarPersona(request, reply) {
	Reply = reply;
	Persona = request.payload.persona;
	// Validar parametros obligatorios
	if (!funciones.validaParametro(Persona.nombres) || !funciones.validaParametro(Persona.apellidos)
		|| !funciones.validaParametro(Persona.email) || !funciones.validaParametro(Persona.fecha_nacimiento)
		|| !funciones.validaParametro(Persona.genero) ) {
	  Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.persona) });
	} else {
		let _strCampos = "";
		let _strValores = "";
		// Armar campos para query de inserción
		_strCampos += "nombres, apellidos, email, fecha_nacimiento, genero ";
		_strValores += "'" + Persona.nombres + "', '" + Persona.apellidos + "', '" + Persona.email + "', '"
								+ Persona.fecha_nacimiento + "', B'" + Persona.genero.toString() + "'";
		// Validar parametros opcionales
		if (funciones.validaParametro(Persona.celular)) {
			_strCampos += ", celular";
			_strValores += ", '" + Persona.celular + "'";
		}
		if (funciones.validaParametro(Persona.dpi)) {
			_strCampos += ", dpi";
			_strValores += ", '" + Persona.dpi + "'";
		}
		if (funciones.validaParametro(Persona.direccion)) {
			_strCampos += ", direccion";
			_strValores += ", '" + Persona.direccion + "'";
		}
		// Agregar campos de gestión internos
		_strCampos += ", fecha_creacion, fecha_modificacion ";
		_strValores += ", now(), now()";
		dbManager.add(_strCampos, "ad_persona", _strValores, cbAddPersona);
	}
}


function cbAddPersona(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error agregando persona" });
	} else {
		Reply({ code: 1, message: "Persona agregada exitosamente" });
	}
}



// #########################################  LISTA DE PERSONAS  #########################################

server.route({
	method: 'GET',
	path: '/admin-personas/lista-personas',
	config: {
	  auth: 'jwt',
	  handler: ListaPersonas
	}
});

function ListaPersonas(request, reply) {
	Reply = reply;
	_strSQL = "SELECT id_persona, nombres, apellidos, to_char(fecha_modificacion, 'yyyy/MM/dd hh:mm:ss') as fecha_modificacion " +
            "FROM   ad_persona";

	dbManager.Correr(_strSQL, cbListaPersonas);
}

function cbListaPersonas(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error obteniendo listado de personas" });
	} else {
		Reply({ code: 1, message: "Personas obtenidas exitosamente", data: { body: result.data.rows } });
	}
}

}

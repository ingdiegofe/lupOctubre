exports.init = function(server) {

var dbManager = require('../../BD/manager');
var options = require('../../BD/options');
var funciones = require('../../Funciones/funciones');
var bcrypt = require('bcrypt-nodejs');
var funciones = require('../../Funciones/funciones');
var Usuario;
var Reply;

// #########################################  BORRAR USUARIO  #########################################

server.route({
	method: 'POST',
	path: '/admin-usuarios/borrar-usuario',
	config: {
	  auth: 'jwt',
	  handler: BorrarUsuario
	}
});

function BorrarUsuario(request, reply){
	Reply = reply;
	IdUsuario = request.payload.idusuario;
	dbManager.remove('ad_usuario', 'id_usuario = ' + IdUsuario, cbBorrarUsuario);
}

function cbBorrarUsuario(result){
	if(!result.success){
		Reply({ code: 0, message: "Error eliminando usuario" });
	}else{
		Reply({ code: 1, message: "Usuario eliminado exitosasemente" });
	}
}


// #########################################  MODIFICAR USUARIO  #########################################

server.route({
	method: 'POST',
	path: '/admin-usuarios/actualizar-usuario',
	config: {
	  auth: 'jwt',
	  handler: ModificarUsuario
	}
});


function ModificarUsuario(request, reply){
	Reply = reply;
	Usuario = request.payload.usuario;
	// Validar parametros obligatorios para actualización
	if( !funciones.validaParametro(Usuario.nombre) ||
			!funciones.validaParametro(Usuario.estado) ||
			!funciones.validaParametro(Usuario.id_persona) ||
			!funciones.validaParametro(Usuario.id_empresa) ||
			!funciones.validaParametro(Usuario.id_usuario)
	){
	 console.log(request.payload.usuario);
	 Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.usuario) });
	}

	// Validar que el nombre del usuario a modificar no exista actualmente
	let _strSQL = "SELECT id_usuario, nombre FROM ad_usuario " +
								"WHERE nombre = '" + Usuario.nombre + "' " +
								"AND 	 id_usuario != " + Usuario.id_usuario;
	dbManager.Correr(_strSQL, cbVerificarNomUsuarioRep);
}

function cbVerificarNomUsuarioRep(result){
	if(!result.success){
			Reply({ code: 0, message: "Error modificando usuario" });
	}else{
			if(result.data.rows > 0){ // Nombre de usuario repetido
				reply({ code: 0, message: "Ya existe otro usuario con el nombre ingresado" });
			}else{
				let _strSQLSet = " nombre = '" + Usuario.nombre + "', " +
												 " estado = " + Usuario.estado.toString() + ", ";

				// Validar si aplica actualizar persona o empresa
				if(Usuario.id_persona != 0) _strSQLSet += "id_persona = " + Usuario.id_persona.toString() + ", ";
				if(Usuario.id_empresa != 0) _strSQLSet += "id_empresa = " + Usuario.id_empresa.toString() + ", ";

				// Colocar parametros internos de actualizacion
				_strSQLSet += "fecha_modificacion = now() ";
				console.log(_strSQLSet);
				dbManager.update(_strSQLSet, 'ad_usuario', "id_usuario = " + Usuario.id_usuario, cbActualizarUsuario);
			}
	}
}

function cbActualizarUsuario(result){
	if(!result.success){
		Reply({ code: 0, message: "Error actualizando información de usuario" });
	}else{
		Reply({ code: 1, message: "Usuario actualizado exitosamente" });
	}
}


// #########################################  AGREGAR USUARIO  #########################################

server.route({
	method: 'POST',
	path: '/admin-usuarios/agregar-usuario',
	config: {
	  auth: 'jwt',
	  handler: AgregarUsuario
	}
});

function AgregarUsuario(request, reply) {
	Reply = reply;
	Usuario = request.payload.usuario;
	// Validar parametros obligatorios
	if ( !funciones.validaParametro(Usuario.nombre) ||
			 !funciones.validaParametro(Usuario.estado) ||
			 !funciones.validaParametro(Usuario.id_rol)
	) {
		console.log(request.payload.usuario);
	  Reply({ code: 0, message: "Error en solicitud = > " + JSON.stringify(request.payload.usuario) });
	} else {
	  // Validar que no exista otro usuario con el mismo nombre
	  _strSQL = "SELECT * " +
				"FROM 	ad_usuario " +
				"WHERE 	nombre = '" + Usuario.nombre + "'";
	  dbManager.Correr(_strSQL, cbVerificarUsuarioRepetido);
	}
}

function cbVerificarUsuarioRepetido(result){
	let _strCampos = "";
	let _strValores = "";
	if(!result.success){
		Reply({ code: 0, message: "Error agregando usuario" });
	}else{
		if(result.data.rows > 0){
			console.log(result.err);
			reply({ code: 0, message: "Ya existe otro usuario con el nombre ingresado" });
		}else{
			console.log("Usuario NO repetido");
			// Armar campos para query de inserción
			_strCampos += "nombre, estado, id_persona, id_empresa, id_rol ";
			_strValores += "'" + Usuario.nombre + "', " + Usuario.estado + ", ";
			// Agregar nulos en id_persona o id_empresa
			if(Usuario.id_persona==0){
				_strValores += "null, ";
			}else{
				_strValores += Usuario.id_persona.toString() + ", ";
			}
			if(Usuario.id_empresa==0){
				_strValores += "null, ";
			}else{
				_strValores += Usuario.id_empresa.toString() + ", ";
			}
			//Agregar id_rol
			_strValores += Usuario.id_rol.toString();

			// Agregar campos de gestión internos
			_strCampos += ", fecha_creacion, fecha_modificacion, clave, logueado ";
			_strValores += ", now(), now(), 'abc123', B'0'";
			dbManager.add(_strCampos, "ad_usuario", _strValores, cbAddUsuario);
		}
	}
}

function cbAddUsuario(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error agregando usuario" });
	} else {
		Reply({ code: 1, message: "Usuario agregada exitosamente" });
	}
}


// #########################################  INFORMACION DE USUARIO  #########################################

server.route({
	method: 'POST',
	path: '/admin-usuarios/info-usuario',
	config: {
	  auth: 'jwt',
	  handler: InformacionUsuario
	}
});

function InformacionUsuario(request, reply){
	Reply = reply;
	_strSQL = 	"SELECT 	id_usuario, nombre,  " +
		"estado, to_char(fecha_modificacion, 'yyyy/MM/dd hh:mm:ss') as fecha_modificacion, " +
		"CASE  	WHEN logueado::int = 1 THEN 'Si' ELSE 'No' END as logueado, id_rol::int, " +
		"to_char(fecha_creacion, 'yyyy/MM/dd hh:mm:ss') as fecha_creacion, to_char(fecha_ingreso, 'yyyy/MM/dd hh:mm:ss') as fecha_ingreso,  " +
		"(CASE 	WHEN id_persona IS NULL THEN 0 ELSE id_persona END)::int as id_persona, " +
		"(CASE 	WHEN id_empresa IS NULL THEN 0 ELSE id_empresa END)::int as id_empresa " +
		"FROM 	ad_usuario " +
		"WHERE	id_usuario = " + request.payload.idusuario;

		dbManager.Correr(_strSQL, cbInformacionUsuario);
}

function cbInformacionUsuario(result){
	if (!result.success) {
		console.log(result.err);
		Reply({ code: 0, message: "Error obteniendo información de usuario" });
	} else {
		console.log("Nombre usuario => " + result.data.rows[0].nombre);
		Reply({ code: 1, message: "Información obtenida exitosamente", body: { usuario: result.data.rows } });
	}
}



// #########################################  LISTA DE ROLES  #########################################

server.route({
	method: 'GET',
	path: '/admin-usuarios/lista-roles',
	config: {
	  auth: 'jwt',
	  handler: ListaRolesUsuario
	}
});

function ListaRolesUsuario(request, reply){
	Reply = reply;
	dbManager.show('id_rol, nombre', 'ad_rol', '1=1', '', cbListaRolesUsuario);
}

function cbListaRolesUsuario(result){
	if(!result.success){
		Reply({ code: 0, message: "Error obteniendo roles de usuario" });
	}else{
		Reply({ code: 1, message: "Roles de usuario obtenidos exitosamente", data: { body: result.data.rows } });
	}
}


// #########################################  LISTA DE USUARIOS  #########################################

server.route({
	method: 'GET',
	path: '/admin-usuarios/lista-usuarios',
	config: {
	  auth: 'jwt',
	  handler: ListaUsuarios
	}
});

function ListaUsuarios(request, reply) {
	Reply = reply;
	_strSQL = 	"SELECT 	U.id_usuario, U.nombre,  " +
		"CASE	WHEN U.estado = 1 THEN 'Activo' ELSE 'Inactivo' END as estado, to_char(U.fecha_modificacion, 'yyyy/MM/dd hh:mm:ss') as fecha_modificacion, " +
		"CASE  	WHEN U.logueado::int = 1 THEN 'Si' ELSE 'No' END as logueado, R.nombre  as rol " +
		"FROM 	ad_usuario U, ad_rol R " +
		"WHERE	R.id_rol = U.id_rol";

	dbManager.Correr(_strSQL, cbListaUsuarios);
}

function cbListaUsuarios(result) {
	if (!result.success) {
		Reply({ code: 0, message: "Error obteniendo listado de usuarios" });
	} else {
		Reply({ code: 1, message: "Usuarios obtenidos exitosamente", data: { body: result.data.rows } });
	}
}



}

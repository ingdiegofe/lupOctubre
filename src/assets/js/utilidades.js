
function IrAPAgadito(cantidad, descripcion, precio){
	let url = 'http://localhost:8081/Lup/pagadito/pago.php?operacion=inicio&cantidad=' + cantidad + 
				'&descripcion=' + descripcion + '&precio=' + precio;
	window.location.href = url;
  }

function obtenerIdUsuario(){
    let id_usuario = "0";
    try{
        let usuario = JSON.parse(localStorage.getItem('identity'));
        id_usuario = usuario[0].id_usuario;
        //console.log("Identity => " + usuario[0].id_usuario);
    }catch(ex){
        id_usuario = "0";
    }
    return id_usuario;
}

function Finalizado(){
	//$('#mdLoading').modal('hide');
	setInterval(function(){ $('#mdLoading').modal('hide'); }, 2000);
}

function Cargando(){
	$('#mdLoading').modal('show');
}


function ValidarCampo(campo){
  if( campo == null || campo == undefined || campo == "" ) return false;
  return true;
}


function DesplegarMensajeAdmin(strTipo, strMensaje){
	var strClass = "";
	if(strTipo=="Ok"){
		strClass = strClass + " alert-success";
	}else if(strTipo=="Error"){
		strClass = strClass + " alert-danger";
	}else if(strTipo=="Advertencia"){
		strClass = strClass + " alert-warning";
	}
	$('#dvMensajeForm').removeClass('alert-danger alert-success alert-warning d-none').addClass(strClass);
	$('#spMensajeForm').html(strMensaje);
}

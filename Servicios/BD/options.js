var manager = require('../BD/manager');

/*metodo que valida si los campos enviados tienen mas de un elemento y construye  v1.1 = v2.1 and v1.2 = v.2.2 and ...*/
function evaluarCampos(strCampo1, strCampo2){
	var arr1 = strCampo1.split("!");
	var arr2 = strCampo2.split("!");
	var str = "";
	if(arr1.length == arr2.length && arr1.length == 1){
		str = strCampo1 + " in (" + strCampo2 + ")";
	}else{
		if(arr1.length == arr2.length){
			for(var i = 0; i < arr1.length; i++){
				if(str != ""){ str += " and ";}
				str += arr1[i] + " in (" + arr2[i] + ")";
			}
		}else{
			for(var i = 0; i < arr1.length; i++){
				if((arr2[i]+"") != "" && arr2[i] != null){
					if(str != ""){ str += " and ";}
					str += arr1[i] + " in (" + arr2[i] + ")";
				}
			}
		}
	}
	
	return str;
}

function getConfOption(restriction, reply){
    var fields;
    var table;

    fields = "tabla,campo,codigo,valor";
    table = "CODIGO_VALOR";
    manager.show(fields,table,restriction,"",function(result){
        if (result.success){
            if(result.data.rowCount>0){
                reply({
                    success: true,
                    data: result.data.rows[0]
                });
            }else{
                reply({
                    success: false,
                    data: null
                });
            }
        }else{
                reply({
                    success: false,
                    data: null
                });
        }
    });
}

function getListOption(lngIdTable, validacion, reply){
    var fields;
    var table;
    var restriction;
	var campo;
    var ListOption = "";

    if(lngIdTable != "" && lngIdTable != -1){
        getConfOption("codigo_valor = '" + lngIdTable + "'",function(result2){

            if (result2.success){
                fields = "(" + result2.data.codigo + ") codigo , (" + result2.data.valor + ") valor";
                table = result2.data.tabla;
				campo = result2.data.campo;
                restriction = " estado <> 0 "; 
				
				if(campo != "" && validacion != "" && validacion != null){
					//restriction += " and " + campo + " = '" + validacion + "'";
					//restriction = " " + campo + " = '" + validacion + "'";
					restriction = evaluarCampos(campo,validacion);
				}
				
				/*if(lngIdTable == 12){
					console.log ("campo =" + campo);
					console.log ("validacion = " + validacion + " - SELECT "+ fields + " from " + table + " where " + restriction);
                }*/
				manager.show(fields,table,restriction,"",function(result){
                    if (result.success){
						
                        if (result.data.rowCount>0){
                            var i = 0;
                            while(i<result.data.rowCount){
                                if(ListOption != ""){
                                    ListOption = ListOption + "||" + result.data.rows[i]["codigo"] + ";" + result.data.rows[i]["valor"];
                                }else{
                                    ListOption = result.data.rows[i]["codigo"] + ";" + result.data.rows[i]["valor"];
                                }
                                i++;
                            }
							
                            reply({
                                success: true,
                                data: ListOption
                            });
                        }else{
                            reply({
                                success: false,
                                data: null
                            });
                        }
                    }else{
						
                        reply({
                            success: false,
                            data: null
                        });
                    }
                });
            }else{
                reply({
                    success: false,
                    data: null
                });
            }
        });
    }else{
        reply({
            success: false,
            data: null
        });
    }
}

function loadOptions(data,validacion,reply){

    var i = 0;
    var j = 0;
	var strVal = "";

	var arrValidacion;//el listado debe ser del mismo numero de tuplas en la configuracion de estructura (conf_estructura) del recurso que se consulte
	
	if(validacion != ""){
		arrValidacion = (validacion + "").split("-");
	}

    if(data.rowCount>0){
        while(i<data.rowCount){
            (function(i){
			
			if(validacion != ""){
				if(arrValidacion[i] != null  ){
					strVal = arrValidacion[i];
				}else{strVal = "";}
			}else{strVal = "";}
			
            getListOption(data.rows[i].tabla_origen,strVal+"",function(result){
                if(result.success){
                    data.rows[i].opciones = result.data;
                }
                j++;
                if(j==data.rowCount){
                    reply({
                        success: true,
                        data: data
                    });
                }
            });
            })(i);
            i++;
        }
    }else{
        reply({
            success: true,
            data: data
        });
    }
}

exports.loadOptions = loadOptions;
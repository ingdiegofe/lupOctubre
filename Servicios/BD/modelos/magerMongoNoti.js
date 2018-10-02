var mongoose = require('mongoose');
var mongo = require('mongodb');
var db = mongoose.createConnection( 'mongodb://localhost:27017/wanedu' );

var notificacionSchema = new mongoose.Schema({
   tipo: String,
   id_publicacion: String,
   fecha_noti: Date,
   visto: String,
   usuario_agrego: String,
   nombre_agrego: String,
   id_comentario: String,
   texto: String,
   sie: String,
   usuarios:[
       {
           nombre: String

       }
   ] 

}); 

var Notificacion = db.model('notificaciones', notificacionSchema);




function show(restriccion, order,limit,reply) {

     if(order=="" && limit == 0){
        Notificacion.find(restriccion,function(err, res) {

            if(err){
                    consol.log("Error");
            }else{
                reply({
                    success: true,
                    data: res
                });
            }

        });
    }
    else{
        console.log("ENTRO A SORT");
        Notificacion.find(restriccion).limit(limit).sort(order).exec(function(err, res) {

            if(err){
                    consol.log("Error");
            }else{
                reply({
                    success: true,
                    data: res
                });
            }

        });
    }
}

function add(json, reply) {

       
        
        var publi = new Notificacion(json);

        publi.save(function (err, res) {
            if (err) {
                console.log(err);
            } else {
                reply({
                        success: true,
                        data: res
                    });
            }
        });

   
}

function updateId(set,id,reply) {

    var o_id = new mongo.ObjectID(id);
    
     Notificacion.update({'_id':o_id},set,function(err, res) {

                if(err){
                        consol.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
}



function update(set,restriccion,reply) {


  

     Notificacion.update(restriccion,set,function(err, res) {

                if(err){
                        consol.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
    


}


function remove(restriccion,reply) {




     Notificacion.remove(restriccion,function(err, res) {

                if(err){
                        consol.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
    
 

}

exports.show = show;
exports.add = add;
exports.update = update;
exports.remove = remove;
exports.updateId = updateId;



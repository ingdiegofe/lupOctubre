var mongoose = require('mongoose');
var db = mongoose.createConnection( 'mongodb://localhost:27017/wanedu' );

var publicacionSchema = new mongoose.Schema({
   id: String,
   publicacion: String,
   like: String,
   usuario: String,
   nombre: String,
   cant_coment: String,
   sie: String,
   institucion: String,
   grado_nivel: [{id: String}],
   fecha_publi: Date,
   cant_archivos: String,
   tags:[
       {
           usuario: String,
           visto: String,
           tipo: String
       }
   ],
   comentarios:[
       {
           id_comentario: String,
           coment: String,
           nombre: String,
           usuario: String,
           sie: String,
           institucion: String,
           grado: String,
           nivel_educativo: String
       }
   ],
    archivos:[
       {
           ruta: String,
           nombre: String,
           tamanio: String
       }
   ],
    like_usu:[
        {
            usuario: String
        }
    ]

}); 

var Publicacion = db.model('publicaciones', publicacionSchema);




function show(restriccion, order,limit,reply) {

     if(order=="" && limit == 0){
        Publicacion.find(restriccion,function(err, res) {

            if(err){
                    console.log("Error");
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
        Publicacion.find(restriccion).limit(limit).sort(order).exec(function(err, res) {

            if(err){
                    console.log("Error");
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

       
        
        var publi = new Publicacion(json);

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


function update(set,restriccion,reply) {


  

     Publicacion.update(restriccion,set,function(err, res) {

                if(err){
                        console.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
    


}


function remove(restriccion,reply) {




     Publicacion.remove(restriccion,function(err, res) {

                if(err){
                        console.log("Error");
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



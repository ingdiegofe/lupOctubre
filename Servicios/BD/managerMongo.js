/*var mongoose = require('mongoose');
var connect = "mongodb://localhost/wanedu";

var publicacion = require('./modelos/publicacion_modelo.js');


function show(restriccion, order,limit,reply) {


   mongoose.connect(connect);

    if(order=="" && limit == 0){
        publicacion.find(restriccion,function(err, res) {

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
        publicacion.find(restriccion).limit(limit).sort(order).exec(function(err, res) {

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

    mongoose.connection.close();

}


function add(json, reply) {

        mongoose.connect(connect);
        
        var publi = new publicacion(json);

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

        mongoose.connection.close();
}


function update(set,restriccion,reply) {


    mongoose.connect(connect);

     publicacion.update(restriccion,set,function(err, res) {

                if(err){
                        consol.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
    
    mongoose.connection.close();

}


function remove(restriccion,reply) {


    mongoose.connect(connect);

     publicacion.remove(restriccion,function(err, res) {

                if(err){
                        consol.log("Error");
                }else{
                    reply({
                        success: true,
                        data: res
                    });
                }

            });
    
    mongoose.connection.close();

}

exports.show = show;
exports.add = add;
exports.update = update;
exports.remove = remove;*/
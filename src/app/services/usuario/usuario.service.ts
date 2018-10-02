import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class UsuarioService {

  url:string = this.globals.Usuario;
 urlr:string = this.globals.UsuarioR;

  constructor(private http:Http,
               private globals:Globals) { }

     getUsuario( Authorization:string, id_usuario:string = "",
                 nombre:string,rol:string){

       let headers = new Headers({
         'Content-Type':'application/x-www-form-urlencoded',
         'Authorization': Authorization
       });

       let body = "?id_usuario=" + id_usuario +
                  '&nombre='+ nombre +
                 '&rolo=' + rol;

       let getUrl = this.url + body;

      // console.log("BODY: "+  body)

       return this.http.get(getUrl, { headers:headers })
         .map( res =>{
           console.log(res.json());
           return res.json();
         });
     }

     getUsuarioRegistro(nombre:string){

       let headers = new Headers({
         'Content-Type':'application/x-www-form-urlencoded'
       });

       let body = "?&nombre="+ nombre;

       let getUrl = this.urlr + body;

      // console.log("BODY: "+  body)

       return this.http.get(getUrl, { headers:headers })
         .map( res =>{
           console.log(res.json());
           return res.json();
         });
     }

     postUsuario( Authorization:string, nombre:string, id_persona:string,id_rol:string){

        let headers = new Headers({
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': Authorization
        });

        let body= '&nombre='+ nombre +
                  '&id_persona=' + id_persona +
                  '&id_rol='+ id_rol;

        return this.http.post( this.url, body, { headers:headers } )
          .map(res=>{
            console.log(res.json());
            return res.json();
          })

      }


     putUsuario(Authorization:string,nombre:string, clave:string,
                estado:string, fecha_ingreso:string,
                logueado:string, rol:string, reinicio:string,
                id_usuario:string){

       let headers = new Headers({
         'Content-Type':'application/x-www-form-urlencoded',
         'Authorization': Authorization
       });
       let body= '&nombre='+ nombre +
                 '&clave=' + clave +
                 '&estado=' + estado +
                 '&logueado=' + logueado +
                 '&rol=' + rol +
                 '&reinicio=' + reinicio +
                 '&id_usuario=' + id_usuario +
                 '&fecha_ingreso=' + fecha_ingreso;



       return this.http.put( this.url, body, { headers:headers } )
         .map(res=>{
           console.log(res.json());
           return res.json();
         })

     }

     postUsuarioR(  nombre:string, id_persona:string,id_rol:string){

       let headers = new Headers({
         'Content-Type':'application/x-www-form-urlencoded'
       });

       let body= '&nombre='+ nombre +
                 '&id_persona=' + id_persona +
                 '&id_rol='+ id_rol;

       return this.http.post( this.url, body, { headers:headers } )
         .map(res=>{
           console.log(res.json());
           return res.json();
         })

     }


     deleteUsuario( Authorization:string, id_persona:string ){

       let headers = new Headers({
         'Content-Type':'application/x-www-form-urlencoded',
         'Authorization': Authorization
       });

       let body= '?id_persona='+ id_persona;

       console.log("DELETE USUARIO: " + this.url+body);

       return this.http.delete( this.url+body,{ headers:headers })
         .map(res=>{
           console.log(res.json());
           return res.json();
         })

     }


}

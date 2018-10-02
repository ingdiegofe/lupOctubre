import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class PersonaService {

  url:string = this.globals.Persona;

  constructor(private http:Http,
               private globals:Globals) { }


               getPersona( Authorization:string, id_persona:string = "",nombres:string, apellidos:string,email:string,
                           fecha_nacimiento:string, dpi:string, celular:number,
                           direccion:string, genero:string, colegiado:number){

              let headers = new Headers({
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': Authorization
              });

              let body = "?id_persona=" + id_persona +
                        '&nombres='+ nombres +
                        '&apellidos=' + apellidos +
                        '&email=' + email +
                        '&fecha_nacimiento='+ fecha_nacimiento +
                        '&dpi=' + dpi +
                        '&celular=' + celular +
                        '&direccion=' + direccion +
                        '&genero=' + genero +
                        '&colegiado=' + colegiado;

              let getUrl = this.url + body;

              console.log("BODY: "+  body)

              return this.http.get(getUrl, { headers:headers })
                .map( res =>{
                  console.log(res.json());
                  return res.json();
                });
            }




            postPersona( Authorization:string, nombres:string, apellidos:string,email:string,
                           fecha_nacimiento:string, dpi:string, celular:number,
                           direccion:string, genero:string, colegiado:number
                           ){

               let headers = new Headers({
                 'Content-Type':'application/x-www-form-urlencoded',
                 'Authorization': Authorization
               });

               let body= '&nombres='+ nombres +
                         '&apellidos=' + apellidos +
                         '&email=' + email +
                         '&fecha_nacimiento='+ fecha_nacimiento +
                         '&dpi=' + dpi +
                         '&celular=' + celular +
                         '&direccion=' + direccion +
                         '&genero=' + genero +
                         '&colegiado=' + colegiado;

               return this.http.post( this.url, body, { headers:headers } )
                 .map(res=>{
                   console.log(res.json());
                   return res.json();
                 })

             }


             postPersonaR( id:string, nombres:string, apellidos:string,email:string,
                            fecha_nacimiento:string, dpi:string, celular:string,
                            direccion:string, genero:string
                            ){

                let headers = new Headers({
                  'Content-Type':'application/x-www-form-urlencoded'
                });

                let body= '&nombres='+ nombres +
                          '&apellidos=' + apellidos +
                          '&email=' + email +
                          '&fecha_nacimiento='+ fecha_nacimiento +
                          '&dpi=' + dpi +
                          '&celular=' + celular +
                          '&direccion=' + direccion +
                          '&id=58' +
                          '&genero=' + genero;

                return this.http.post( this.url, body, { headers:headers } )
                  .map(res=>{
                    console.log(res.json());
                    return res.json();
                  })

              }


            putPersona(Authorization:string,nombres:string, apellidos:string, email:string, fecha_nacimiento:string,
                       dpi:string, celular:string, direccion:string, colegiado:string,
                       genero:string, id_persona:string){

              let headers = new Headers({
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': Authorization
              });
              let body= '&nombres='+ nombres +
                        '&apellidos=' + apellidos +
                        '&email=' + email +
                        '&fecha_nacimiento=' + fecha_nacimiento +
                        '&dpi=' + dpi +
                        '&celular=' + celular +
                        '&direccion=' + direccion +
                        '&colegiado=' + colegiado +
                        '&id_persona=' + id_persona +
                        '&genero=' + genero ;



              return this.http.put( this.url, body, { headers:headers } )
                .map(res=>{
                  console.log(res.json());
                  return res.json();
                })

            }


            deletePersona( Authorization:string, id_persona:string ){

              let headers = new Headers({
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization': Authorization
              });

              let body= '?id_persona='+ id_persona;

              return this.http.delete( this.url+body,{ headers:headers })
                .map(res=>{
                  console.log(res.json());
                  return res.json();
                })

            }


}

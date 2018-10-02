import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class CategoriaService {

    url:string = this.globals.Categoria;

  constructor(private http:Http,
               private globals:Globals) { }

               getCategoria( Authorization:string, nombre:string){

                 let headers = new Headers({
                   'Content-Type':'application/x-www-form-urlencoded',
                   'Authorization': Authorization
                 });

                 let body = "?nombre=" + nombre;

                 let getUrl = this.url + body;

                // console.log("BODY: "+  body)

                 return this.http.get(getUrl, { headers:headers })
                   .map( res =>{
                     console.log(res.json());
                     return res.json();
                   });
               }
}

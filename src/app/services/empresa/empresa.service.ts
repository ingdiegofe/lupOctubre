import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class EmpresaService {

  url:string = this.globals.Empresa;

  constructor(private http:Http,
               private globals:Globals) { }


               getEmpresa( Authorization:string, nombre:string, categoria:string){

                 let headers = new Headers({
                   'Content-Type':'application/x-www-form-urlencoded',
                   'Authorization': Authorization
                 });

                 let body = "?nombre=" + nombre +
                            '&categoria=' + categoria;

                 let getUrl = this.url + body;

                // console.log("BODY: "+  body)

                 return this.http.get(getUrl, { headers:headers })
                   .map( res =>{
                     console.log(res.json());
                     return res.json();
                   });
               }
}

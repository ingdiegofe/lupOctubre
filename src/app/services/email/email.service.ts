import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class EmailService {

  url:string = this.globals.Email;

  constructor(private http:Http,
               private globals:Globals) { }

               EnvioEmail(strNombre:string,
                          strEmail:string,
                          strTelefono:string,
                          strAsunto:string,
                          strMensaje:string)
               {

                 let headers = new Headers({
                   'Content-Type':'application/x-www-form-urlencoded'
                 });

                 let body= '&nombre='+ strNombre +
                           '&email=' + strEmail +
                           '&telefono=' + strTelefono +
                           '&asunto=' + strAsunto +
                           '&mensaje=' + strMensaje;

                 return this.http.post( this.url, body, { headers:headers } )
                   .map(res=>{
                     console.log(res.json());
                     return res.json();
                   })

               }

}

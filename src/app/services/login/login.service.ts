import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  url:string = this.globals.Login;
  identity:any;
  token:any;

  constructor(private http:Http,
               private globals:Globals) { }

               postLogin(strNombre:string, strClave:string, gethash = null){

               let headers = new Headers({
                 'Content-Type':'application/x-www-form-urlencoded'
               });

               let body= '&nombre='+ strNombre +
                         '&clave=' + strClave +
                         '&gethash=' + gethash;

               return this.http.post( this.url, body, { headers:headers } )
                 .map(res=>{
                   console.log(res.json());
                   return res.json();
                 })

             }


             getIdentity(){
               let identity = JSON.parse(localStorage.getItem('identity'));
               if(identity != "undefine"){
                 this.identity = identity;
               }else{
                 this.identity = null;
               }

               return this.identity;

             }

             getToken(){
               let token = JSON.parse(localStorage.getItem('token'));
               if(token != "undefine"){
                 this.token = token;
               }else{
                 this.token = null;
               }

               return this.token;
             }

}

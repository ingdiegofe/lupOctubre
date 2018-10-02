import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class PaisService {

    url:string = this.globals.Pais;

  constructor(private http:Http,
               private globals:Globals) { }

               getPais(id:string = ""){

                let headers = new Headers({
                  'Content-Type':'application/x-www-form-urlencoded'
                });

                let body = "?id_pais=" + id;

                let getUrl = this.url + body;

                
                return this.http.get(getUrl, { headers:headers })
                  .map( res =>{
                    console.log(res.json());
                    return res.json();
                  });
              }

}

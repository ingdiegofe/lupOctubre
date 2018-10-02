import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals'
import 'rxjs/Rx';


@Injectable()
export class AdminNoticiasService {

  url: string = this.globals.MantNoticias;

  constructor(private http: Http, private globals: Globals) { }

  BorrarNoticia(idnoticia){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/borrar-noticia';

    return this.http.post(postUrl, idnoticia, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  AgregarNoticia(noticia){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/agregar-noticia';

    return this.http.post(postUrl, noticia, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  getNoticias() {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token });
    let body = "?estado=A";
    let getUrl = this.url + '/lista-noticias' + body;

    return this.http.get(getUrl, { headers: headers })
      .map(res => {
        //console.log(res.json());
        return res.json();
      });

  }

}

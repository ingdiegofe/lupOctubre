import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals'
import 'rxjs/Rx';

@Injectable()
export class AdminEmpresasService {

  url: string = this.globals.MantEmpresas;

  constructor(private http: Http, private globals: Globals) { }

  ListaCategorias(){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token });
    let getUrl = this.url + '/lista-categorias';

    return this.http.get(getUrl, { headers: headers })
      .map(res => {
        //console.log(res.json());
        return res.json();
      });
  }

  InfoEmpresa(idempresa){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/info-empresa';

    return this.http.post(postUrl, idempresa, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  BorrarEmpresa(idempresa){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/borrar-empresa';

    return this.http.post(postUrl, idempresa, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  ActualizarEmpresa(empresa){
    let token = localStorage.getItem('token');
	  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/actualizar-empresa';

    return this.http.post(postUrl, empresa, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  AgregarEmpresa(empresa){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/agregar-empresa';

    return this.http.post(postUrl, empresa, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  getEmpresas() {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token });
    
    let body = "?estado=A";
    let getUrl = this.url + '/lista-empresas' + body;

    return this.http.get(getUrl, { headers: headers })
      .map(res => {
        //console.log(res.json());
        return res.json();
      });

  }


}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals'
import 'rxjs/Rx';

@Injectable()
export class AdminUsuariosService {

 url: string = this.globals.MantUsuarios;

  constructor(private http: Http, private globals: Globals) { }


  InfoUsuario(idusuario){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/info-usuario';

    return this.http.post(postUrl, idusuario, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  BorrarUsuario(idusuario){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/borrar-usuario';

    return this.http.post(postUrl, idusuario, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  ActualizarUsuario(usuario){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/actualizar-usuario';

    return this.http.post(postUrl, usuario, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  AgregarUsuario(usuario){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/agregar-usuario';

    return this.http.post(postUrl, usuario, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

  ListaRoles(){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token });
    let getUrl = this.url + '/lista-roles';

    return this.http.get(getUrl, { headers: headers })
      .map(res => {
        //console.log(res.json());
        return res.json();
      });
  }

  getUsuarios() {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': token });
    let body = "?estado=A";
    let getUrl = this.url + '/lista-usuarios' + body;

    return this.http.get(getUrl, { headers: headers })
      .map(res => {
        //console.log(res.json());
        return res.json();
      });

  }
}

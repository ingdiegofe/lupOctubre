import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals'
import 'rxjs/Rx';

@Injectable()
export class CompraService {

  url: string = this.globals.Compra;

  constructor(private http: Http, private globals: Globals) { }

  VerfificarCompra(token_pagadito){
    let headers = new Headers({ 'Content-Type': 'application/json', 'Data-Type': 'json' });
    //let postUrl = 'http://localhost:8081/Lup/pagaditolup/verificacion.php';
    let postUrl = 'http://45.32.70.155/pagaditolup/verificacion.php';
    let postObj = { "operacion": "verificacion", "token": token_pagadito };

    return this.http.post(postUrl, postObj, { headers: headers })
    .map(res => {
      return res.json();
    });
  }

  IniciarCompra(compra){
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': token });
    let postUrl = this.url + '/iniciar-compra';

    return this.http.post(postUrl, compra, { headers: headers })
    .map(res => {
      //console.log(res.json());
      return res.json();
    });
  }

}

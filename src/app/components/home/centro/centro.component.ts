import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../../services/noticia/noticia.service';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent implements OnInit {

  //Seguridad
  identity:any;
  token:any;

  //Cargar
  strNoticia:any;

  constructor(private _loginService:LoginService,
              private router:Router,
              private _noticiaService:NoticiaService) {

              // Obtener variables del localStorage INICIO
              this.identity = this._loginService.getIdentity();
              this.token = this._loginService.getToken();

              if(this.identity==null){
                this.router.navigate(['/ErrLog']);
              }
              //  Obtener variables del localStorage FIN



}

  ngOnInit() {

  this.CargarNoticias();

  }


  CargarNoticias(){

    this._noticiaService.getNoticia(this.token)
    .subscribe( data=>{

       this.strNoticia = data.data.body;

    })
  }

}

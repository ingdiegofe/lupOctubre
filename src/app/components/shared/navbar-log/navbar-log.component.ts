import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-navbar-log',
  templateUrl: './navbar-log.component.html',
  styleUrls: ['./navbar-log.component.css']
})
export class NavbarLogComponent implements OnInit {

  identity:any;
  token:any;
  TipoUsuario:any;

  constructor(private _loginService:LoginService,
              private _usuariosService:UsuarioService,
              private router:Router) {

                // Obtener variables del localStorage INICIO
                this.identity = this._loginService.getIdentity();
                this.token = this._loginService.getToken();

                if(this.identity==null){
                //  this.router.navigate(['/ErrLog']);
                }else{
                this.TipoUsuario = this.identity[0].id_tipo_usuario;
                }
                //  Obtener variables del localStorage FIN


              }

  ngOnInit() {
  }

  CerrarSesion(){
    console.log("entro")
    this._usuariosService.putUsuario( this.token,
                                      "",
                                      "",
                                      "",
                                      "",
                                      "0",
                                      "",
                                      "",
                                      JSON.stringify(this.identity[0].id_usuario)
                                    )
     .subscribe(data=>{

       localStorage.removeItem('identity');
       localStorage.removeItem('token');
       localStorage.clear();

       this.router.navigate(['/home']);

     })

  }

}

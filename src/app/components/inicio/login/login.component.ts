import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { Identity } from '../../../interfaces/marcador.interface';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  strUsuario:string;
  strClave: string;
  objConsulta:any;
  lngIngreso: number = 0;
  lngIngresoEntrar: number = 0;
  strMensaje: string = "";
  objIdentity:Identity[] =[];


  identity:any;

  forma:FormGroup;


  constructor(private router: Router,
              private _loginService:LoginService,
              private _usuariosService:UsuarioService) {

                this.forma = new FormGroup({
                 'usuario': new FormControl('', Validators.required), //valor por defecto, Reglas de validacion, reglas de validacion asincronas
                 'password': new FormControl('',Validators.required)
               })
  }

  ngOnInit() {
  }

  Ingresar(){
	console.log(this.forma.valid)
	if(this.forma.valid){
        this._loginService.postLogin(this.forma.value.usuario,this.forma.value.password,true)
        .subscribe(
          data=>{
            this.objConsulta = data;
            console.log(this.objConsulta)
            if(data.codigo==1){
              this.objIdentity.push(data.data.body);
              localStorage.setItem('identity', JSON.stringify(this.objIdentity));
              localStorage.setItem('token', JSON.stringify(this.objIdentity[0].token));
              this.identity = this._loginService.getIdentity();
              console.log(this.identity);
              this._usuariosService.putUsuario( this.objIdentity[0].token,
				  "",
				  "",
				  "",
				  "now()",
				  "1",
				  "",
				  "",
				  JSON.stringify(this.objIdentity[0].id_usuario)
				).subscribe(data=>{
                   this.lngIngresoEntrar = 7;
                   setTimeout(()=>{ this.lngIngresoEntrar = 0;
                        console.log("LOG: " + this.objIdentity[0].id_tipo_usuario)
                        if(this.objIdentity[0].id_tipo_usuario=='1'){
                            this.router.navigate(['/homeL']);
                             $('#exampleModal').modal('toggle');
                        }

                        if(this.objIdentity[0].id_tipo_usuario=='2'){
                            this.router.navigate(['/homeE']);
                             $('#exampleModal').modal('toggle');
                        }

                        if(this.objIdentity[0].id_tipo_usuario=='3'){
                            this.router.navigate(['/inicio']);
                             $('#exampleModal').modal('toggle');
                        }

                        if(this.objIdentity[0].id_tipo_usuario=='4'){
                            this.router.navigate(['/inicio']);
                        }

                        if(this.objIdentity[0].id_tipo_usuario=='5'){
                            this.router.navigate(['/inicio']);
                        }

                    }, 3000);
                 })




            //  console.log("identi: " + JSON.stringify(this.objIdentity[0].token));


            }else if(data.codigo==2){
              this.lngIngresoEntrar = 7;
              setTimeout(()=>{ this.lngIngresoEntrar = 0;
                this.lngIngreso = data.codigo;
                this.strMensaje = data.message;
                setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
              }, 1000);

            }else if(data.codigo==3){
              this.lngIngresoEntrar = 7;
              setTimeout(()=>{ this.lngIngresoEntrar = 0;
                this.lngIngreso = data.codigo;
                this.strMensaje = data.message;
                setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
              }, 1000);

            }else if(data.codigo==4){
              this.lngIngresoEntrar = 7;
              setTimeout(()=>{ this.lngIngresoEntrar = 0;
                this.lngIngreso = data.codigo;
                this.strMensaje = data.message;
                setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
              }, 1000);

            }
          }
        )
      }else{

            this.lngIngreso = 5;
            this.strMensaje = "Ingrese usuario y contraseña.";
            setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
      }




}

}

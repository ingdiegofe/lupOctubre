import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../../services/pais/pais.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { PersonaService } from '../../../services/persona/persona.service';
import { FormGroup, FormControl, Validators,NgModel } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  //Cargar
  strPais:any;

  //token
  identity:any;
  token:any;

  //Formularios
  forma:FormGroup;

  //Botones
  isEnviar:boolean =  true;


  //Usuario verifica
  lngUsExiste = 0;
  strUsuarioMod:string;

  //Variables mensajes
  lngMensaje:number = 2;
  lngAgregar:number = 0;
  lngIngreso:number = 0;
  strMensaje:string = "";



  constructor(private _paisService:PaisService,
              private _personaService:PersonaService,
              private _usuarioService:UsuarioService) {

             //Controles de Formularios
              this.forma = new FormGroup({
                'nombres': new FormControl('',Validators.required),
                'apellidos': new FormControl('',Validators.required),
                'email': new FormControl('',[
                                              Validators.required,
                                              Validators.pattern("[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}$")
                                            ]
                                        ),
               'fecha_nacimiento': new FormControl('',Validators.required),
               'pais': new FormControl('',Validators.required),
               'usuario': new FormControl('',Validators.required)
              })


              //Forma usuario repetido
              this.forma.controls['usuario'].valueChanges
                  .subscribe( data =>{
                      let usuario = data;
                      console.log(usuario)
                      this._usuarioService.getUsuarioRegistro(data)
                      .subscribe( data=>{

                          if(data.existe==1){
                            if(usuario == this.strUsuarioMod){
                              this.lngUsExiste = 0;
                            }else{
                              this.lngUsExiste = 1;
                            }

                          }else{
                            this.lngUsExiste = 0;
                          }

                      })
                  })

  }

  ngOnInit() {
    this.CargarPais();
  }

  CargarPais(){
    this._paisService.getPais("")
      .subscribe( data=>{

          this.strPais = data.data.body;

      })
  }


  EnvioCorreo(){

    if(this.forma.valid && this.lngUsExiste==0){

          //Ingreso de Persona
           this._personaService.postPersonaR("58",
                                        this.forma.value.nombres,
                                        this.forma.value.apellidos,
                                        this.forma.value.email,
                                        this.forma.value.fecha_nacimiento,
                                        "",
                                        "",
                                        "",
                                        "")
             .subscribe(data=>{



                this.AgregarUsuario(data.data)


             })

    }else{
      this.lngAgregar = 1;

      setTimeout(()=>{ this.lngAgregar = 0;
        this.lngIngreso = 1;
        this.strMensaje = "Verifique los campos.";
        setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
      }, 1000);
    }

  }


  AgregarUsuario(idPersona){

    this._usuarioService.postUsuarioR(
                                 this.forma.value.usuario,
                                 idPersona,
                                 "3")
      .subscribe(data=>{

         this.lngAgregar = 1;
         this.isEnviar = false;

         setTimeout(()=>{ this.lngAgregar = 0;
           this.forma.reset();
           //this.Consultar();

           this.lngIngreso = 2;
           this.strMensaje = "Usuario creado con exito";
           setTimeout(()=>{
             this.lngIngreso = 0;
             this.isEnviar = true;

           }, 3000);
         }, 2000);
      })

  }

}

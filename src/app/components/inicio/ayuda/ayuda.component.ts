import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from '../../../services/email/email.service';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

//Variables mensajes
lngMensaje:number = 2;
lngAgregar:number = 0;
lngIngreso:number = 0;
strMensaje:string = "";

//Botones
isEnviar:boolean =  true;

//Formularios
forma:FormGroup;

  constructor(private _emailService:EmailService) {

           //Controles de Formularios
            this.forma = new FormGroup({
              'nombre': new FormControl('',Validators.required),
              'email': new FormControl('',[
                                            Validators.required,
                                            Validators.pattern("[a-zA-Z0-9._-]+[@]+[a-zA-Z0-9-]+[.]+[a-zA-Z]{2,6}$")
                                          ]
                                      ),
              'telefono': new FormControl('',Validators.required),
              'asunto': new FormControl('',Validators.required),
              'mensaje': new FormControl('',Validators.required),
            })

  }

  ngOnInit() {
    window.scrollTo(0, 0)
  }
    EnvioCorreo(){

      if(this.forma.valid){

              this.lngAgregar = 1;
              this.isEnviar = false;
              this._emailService.EnvioEmail(this.forma.value.nombre,
                                            this.forma.value.email,
                                            this.forma.value.telefono,
                                            this.forma.value.asunto,
                                            this.forma.value.mensaje)
              .subscribe(
                data=>{



                  setTimeout(()=>{ this.lngAgregar = 0;

                    this.forma.reset();


                    this.lngIngreso = 2;
                    this.strMensaje = "Mensaje enviado con exito.";
                    setTimeout(()=>{ this.lngIngreso = 0;
                      this.isEnviar = true;
                    }, 3000);
                  }, 1000);

                } );


      }else{
        this.lngAgregar = 1;

        setTimeout(()=>{ this.lngAgregar = 0;
          this.lngIngreso = 1;
          this.strMensaje = "Verifique los campos.";
          setTimeout(()=>{ this.lngIngreso = 0; }, 3000);
        }, 1000);
      }

    }

}

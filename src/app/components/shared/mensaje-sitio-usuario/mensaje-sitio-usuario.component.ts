import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensaje-sitio-usuario',
  templateUrl: './mensaje-sitio-usuario.component.html',
  styleUrls: ['./mensaje-sitio-usuario.component.css']
})
export class MensajeSitioUsuarioComponent implements OnInit {

  mensaje: string;
  visible: boolean;
  tipo: string;

  constructor() { }

  Limpiar(){
    this.mensaje = "";
    this.visible = false;
    this.tipo = "";
  }

  Mensaje(mensaje, tipo){
    this.mensaje = mensaje;
    this.visible = true;
    this.tipo = tipo;
  }

  ObtenerClaseCss(){
    if(this.tipo=="ok"){
      return "alert-success";
    }else if(this.tipo=="advertencia"){
      return "alert-warning";
    }else if(this.tipo=="error"){
      return "alert-danger";
    }else{
      return "alert-danger";
    }
  }

  Ocultar(){
    this.visible = false;
  }

  ngOnInit() {
    this.Limpiar();
  }

}

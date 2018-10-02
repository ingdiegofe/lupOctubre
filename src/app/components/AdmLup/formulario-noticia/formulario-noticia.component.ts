import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNoticiasService } from '../../../services/admin/admin-noticias/admin-noticias.service';

declare function ValidarCampo(campo): any;
declare function Cargando(): any;
declare function Finalizado(): any;
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-formulario-noticia',
  templateUrl: './formulario-noticia.component.html',
  styleUrls: ['./formulario-noticia.component.css']
})
export class FormularioNoticiaComponent implements OnInit {

  Operacion: string;
  Titulo: string;
  Noticia = { id_noticia: 0, titulo: "", texto: "", fecha_creacion: "", fecha_modificacion: "" };

  constructor(private _adminNoticiasService: AdminNoticiasService,
  private route: ActivatedRoute) { }

  AgregarNoticia() {
    let _strMensaje = "";
    // Validar campos obligatorios de persona
    if (!ValidarCampo(this.Noticia.titulo) || !ValidarCampo(this.Noticia.texto)) {
      _strMensaje = "Se deben ingresar todos los campos obligatorios";
    }

    if (_strMensaje != "") {
      DesplegarMensajeAdmin("Error", _strMensaje);
    } else {
      Cargando();
      this._adminNoticiasService.AgregarNoticia({ noticia: this.Noticia })
        .subscribe(data => {
          Finalizado();
          if (data.code == 1) {
            DesplegarMensajeAdmin("Ok", data.message);
          } else {
            DesplegarMensajeAdmin("Error", data.message);
          }
        });
    }
  }

  ngOnInit() {
    let strOperacion = this.route.snapshot.params['operacion'];
    this.Operacion = strOperacion;
    if (strOperacion == "agregar") {
      this.Titulo = "Agregar nueva noticia";
    } else if (strOperacion == "informacion") {
      this.Titulo = "Información noticia";
    } else if (strOperacion == "modificar") {
      this.Titulo = "Modificar noticia";
    }
  }

}

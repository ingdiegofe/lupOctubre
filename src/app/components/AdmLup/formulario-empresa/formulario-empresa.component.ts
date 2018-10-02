import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminEmpresasService } from '../../../services/admin/admin-empresas/admin-empresas.service';
declare function ValidarCampo(campo): any;
declare function Cargando(): any;
declare function Finalizado(): any;
declare function obtenerIdUsuario(): any;
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-formulario-empresa',
  templateUrl: './formulario-empresa.component.html',
  styleUrls: ['./formulario-empresa.component.css']
})
export class FormularioEmpresaComponent implements OnInit {

  Operacion: string;
  Titulo: string;
  Empresa = { id_empresa: 0, nombre: "", correo: "", telefono: "", direccion: "", 
              url: "", nit: "", categoria: 0, representante_legal: "", usuario_modifica: "" };
  categorias = [];

  constructor(private _adminEmpresasService: AdminEmpresasService, private route: ActivatedRoute) { }

  ActualizarEmpresa() {
    let _strMensaje = "";
    // Validar campos obligatorios de empresa
    if (!ValidarCampo(this.Empresa.nombre)) {
      _strMensaje = "Se deben ingresar todos los campos obligatorios";
    }
    // Validar campos no obligatorios

    if (_strMensaje != "") {
      DesplegarMensajeAdmin("Error", _strMensaje);
    } else {
      this.Empresa.usuario_modifica = obtenerIdUsuario();
      Cargando();
      this._adminEmpresasService.ActualizarEmpresa({ empresa: this.Empresa })
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

  ListaCategorias() {
    this._adminEmpresasService.ListaCategorias()
      .subscribe(data => {
        if (data.code == 1) {
          this.categorias = data.data.body;
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }

  AgregarEmpresa() {
    let _strMensaje = "";
    // Validar campos obligatorios de empresa
    if (!ValidarCampo(this.Empresa.nombre)) {
      _strMensaje = "Se deben ingresar todos los campos obligatorios";
    }
    // Validar campos no obligatorios

    if (_strMensaje != "") {
      DesplegarMensajeAdmin("Error", _strMensaje);
    } else {
      this.Empresa.usuario_modifica = obtenerIdUsuario();
      Cargando();
      this._adminEmpresasService.AgregarEmpresa({ empresa: this.Empresa })
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

  InfoEmpresa() {
    let idEmpresa = this.route.snapshot.params['idempresa'];
    this._adminEmpresasService.InfoEmpresa({ idempresa: idEmpresa })
      .subscribe(data => {
        Finalizado();
        if (data.code == 1) {
          this.Empresa = data.body.empresa[0];
          this.ListaCategorias();
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }

  ngOnInit() {
    console.log(this.route.snapshot.params['operacion']);
    let strOperacion = this.route.snapshot.params['operacion'];
    this.Operacion = strOperacion;
    if (strOperacion == "agregar") {
      this.Titulo = "Agregar nueva empresa";
      this.ListaCategorias();
    } else if (strOperacion == "informacion") {
      this.Titulo = "Información empresa";
      this.InfoEmpresa();
    } else if (strOperacion == "modificar") {
      this.Titulo = "Modificar empresa";
      this.InfoEmpresa();
    }
    //this.ListaCategorias();
  }

  ngOnDestroy() {
  }

}

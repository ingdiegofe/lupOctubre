import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUsuariosService } from '../../../services/admin/admin-usuarios/admin-usuarios.service';
import { AdminPersonasService } from '../../../services/admin/admin-personas/admin-personas.service';
import { AdminEmpresasService } from '../../../services/admin/admin-empresas/admin-empresas.service';

declare function ValidarCampo(campo): any;
declare function Cargando(): any;
declare function Finalizado(): any;
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  Operacion: string;
  Titulo: string;
  Usuario = { id_usuario: 0, nombre: "", fecha_creacion: "", fecha_ingreso: "", logueado: "", estado: "", id_rol: 0, id_persona: 0, id_empresa: 0 };
  roles = [];
  Empresas = [];
  Personas = [];

  constructor(private _adminUsuariosService: AdminUsuariosService,
    private _adminPersonasService: AdminPersonasService,
    private _adminEmpresasService: AdminEmpresasService,
    private route: ActivatedRoute) { }

  ActualizarUsuario() {
    let _strMensaje = "";
    // Validar campos obligatorios de empresa
    if (!ValidarCampo(this.Usuario.nombre)) {
      _strMensaje = "Se deben ingresar todos los campos obligatorios";
    }
    // Validar campos no obligatorios

    if (_strMensaje != "") {
      DesplegarMensajeAdmin("Error", _strMensaje);
    } else {
      Cargando();
      this._adminUsuariosService.ActualizarUsuario({ usuario: this.Usuario })
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

  ObtenerPersonas() {
    this._adminPersonasService.getPersonas()
      .subscribe(data => {
        if (data.code == 1) {
          this.Personas = data.data.body;
          this.ObtenerEmpresas();
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }

  ObtenerEmpresas() {
    this._adminEmpresasService.getEmpresas()
      .subscribe(data => {
        if (data.code == 1) {
          this.Empresas = data.data.body;
          if (this.Operacion != 'agregar') {
            this.InfoUsuario();
          }
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }

  ListaRoles() {
    this._adminUsuariosService.ListaRoles()
      .subscribe(data => {
        if (data.code == 1) {
          this.roles = data.data.body;
          this.ObtenerPersonas();
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }

  AgregarUsuario() {
    let _strMensaje = "";
    // Validar campos obligatorios de persona
    if (!ValidarCampo(this.Usuario.nombre) || !ValidarCampo(this.Usuario.estado) || !ValidarCampo(this.Usuario.id_rol)) {
      _strMensaje = "Se deben ingresar todos los campos obligatorios";
    }

    if (_strMensaje != "") {
      DesplegarMensajeAdmin("Error", _strMensaje);
    } else {
      this._adminUsuariosService.AgregarUsuario({ usuario: this.Usuario })
        .subscribe(data => {
          if (data.code == 1) {
            DesplegarMensajeAdmin("Ok", data.message);
          } else {
            DesplegarMensajeAdmin("Error", data.message);
          }
        });
    }
  }

  InfoUsuario() {
    let idUsuario = this.route.snapshot.params['idusuario'];
    this._adminUsuariosService.InfoUsuario({ idusuario: idUsuario })
      .subscribe(data => {
        if (data.code == 1) {
          this.Usuario = data.body.usuario[0];
        } else {
          DesplegarMensajeAdmin("Error", data.message);
        }
      });
  }


  ngOnInit() {
    let strOperacion = this.route.snapshot.params['operacion'];
    this.Operacion = strOperacion;
    if (strOperacion == "agregar") {
      this.Titulo = "Agregar nuevo usuario";
      this.ListaRoles();
    } else if (strOperacion == "informacion") {
      this.Titulo = "Información usuario";
      this.ListaRoles();
    } else if (strOperacion == "modificar") {
      this.Titulo = "Modificar usuario";
      this.ListaRoles();
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { AdminUsuariosService } from '../../../services/admin/admin-usuarios/admin-usuarios.service';
import { Router } from '@angular/router';
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-mantenimiento-usuarios',
  templateUrl: './mantenimiento-usuarios.component.html',
  styleUrls: ['./mantenimiento-usuarios.component.css']
})
export class MantenimientoUsuariosComponent implements OnInit {

  usuarios = [];
  UsuarioABorrar = { id_usuario: 0, nombre: "" }

  constructor(private _adminUsuariosService:AdminUsuariosService, private router: Router) { }

  ngOnInit() {
    this.ObtenerUsuarios();
  }

  VerModalBorrarUsuario(Usuario){
    this.UsuarioABorrar = Usuario;
    $('#mdBorrarUsuario').modal('show');
  }

  BorrarUsuario(){
    this._adminUsuariosService.BorrarUsuario({ idusuario: this.UsuarioABorrar.id_usuario })
    .subscribe(data=>{
        $('#mdBorrarUsuario').modal('hide');
        if(data.code==1){
          DesplegarMensajeAdmin("Ok", data.message);
          this.ObtenerUsuarios();
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
    });
  }

  IrAAgregarUsuario(){
    this.router.navigate(['formU/agregar/0']);
  }

  IrAModificarUsuario(Usuario){
    console.log(Usuario);
    this.router.navigate(['formU/modificar/' + Usuario.id_usuario ]);
  }

  IrAFormularioUsuario(Usuario){
    console.log(Usuario);
    this.router.navigate(['formU/informacion/' + Usuario.id_usuario ]);
  }

  ObtenerUsuarios()
  {
	  this._adminUsuariosService.getUsuarios()
	  .subscribe(data=>{
		if(data.code==1){
          this.usuarios = data.data.body;
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
	  });
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminEmpresasService } from '../../../services/admin/admin-empresas/admin-empresas.service';
import { Router } from '@angular/router';
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-mantenimiento-empresas',
  templateUrl: './mantenimiento-empresas.component.html',
  styleUrls: ['./mantenimiento-empresas.component.css']
})
export class MantenimientoEmpresasComponent implements OnInit {

  empresas = [];
  EmpresaABorrar = { id_empresa: 0, nombre: "" };
  constructor(private _adminEmpresasService:AdminEmpresasService, private router: Router) { }

  ngOnInit() {
    this.ObtenerEmpresas();
  }

  VerModalBorrarEmpresa(Empresa){
    this.EmpresaABorrar = Empresa;
    console.log(this.EmpresaABorrar);
    $('#mdBorrarEmpresa').modal('show');
  }

  BorrarEmpresa(){
    this._adminEmpresasService.BorrarEmpresa({ idempresa: this.EmpresaABorrar.id_empresa })
	  .subscribe(data=>{
        $('#mdBorrarEmpresa').modal('hide');
		    if(data.code==1){
          DesplegarMensajeAdmin("Ok", data.message);
          this.ObtenerEmpresas();
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
	  });
  }

  IrAFormularioAgregar(){
    this.router.navigate(['formE/agregar/0']);
  }

  IrAFormularioInformacion(Empresa){
    console.log(Empresa);
    this.router.navigate(['formE/informacion/' + Empresa.id_empresa]);
  }

  IrAFormularioModificar(Empresa){
    this.router.navigate(['formE/modificar/' + Empresa.id_empresa]);
  }

  ObtenerEmpresas()
  {
	  this._adminEmpresasService.getEmpresas()
	  .subscribe(data=>{
		if(data.code==1){
          this.empresas = data.data.body;
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
	  });
  }

}

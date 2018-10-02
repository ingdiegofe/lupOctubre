import { Component, OnInit } from '@angular/core';
import { AdminNoticiasService } from '../../../services/admin/admin-noticias/admin-noticias.service';
import { Router } from '@angular/router';
declare function DesplegarMensajeAdmin(strTipo, strMensaje): any;

@Component({
  selector: 'app-mantenimiento-noticias',
  templateUrl: './mantenimiento-noticias.component.html',
  styleUrls: ['./mantenimiento-noticias.component.css']
})
export class MantenimientoNoticiasComponent implements OnInit {

  noticias = [];
  NoticiaABorrar = { id_noticia: 0, titulo: "" }

  constructor(private _adminNoticiassService:AdminNoticiasService, private router: Router) { }

  ngOnInit() {
    this.ObtenerNoticias();
  }

  IrAAgregarNoticia(){
    this.router.navigate(['formN/agregar/0']);
  }

  VerModalBorrarNoticia(Noticia){
    this.NoticiaABorrar = Noticia;
    $('#mdBorrarNoticia').modal('show');
  }

  BorrarNoticia(){
    this._adminNoticiassService.BorrarNoticia({ idnoticia: this.NoticiaABorrar.id_noticia })
    .subscribe(data=>{
        $('#mdBorrarNoticia').modal('hide');
        if(data.code==1){
          DesplegarMensajeAdmin("Ok", data.message);
          this.ObtenerNoticias();
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
    });
  }

  ObtenerNoticias()
  {
	  this._adminNoticiassService.getNoticias()
	  .subscribe(data=>{
		if(data.code==1){
          console.log(data.data.body);
          this.noticias = data.data.body;
        }else{
          DesplegarMensajeAdmin("Error", data.message);
        }
	  });
  }

}

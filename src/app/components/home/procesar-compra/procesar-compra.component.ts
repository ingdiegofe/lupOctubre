import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompraService } from '../../../services/compra/compra.service';
import { MensajeSitioUsuarioComponent } from '../../shared/mensaje-sitio-usuario/mensaje-sitio-usuario.component';

@Component({
  selector: 'app-procesar-compra',
  templateUrl: './procesar-compra.component.html',
  styleUrls: ['./procesar-compra.component.css']
})
export class ProcesarCompraComponent implements OnInit {
  @ViewChild('mensaje') mensaje: MensajeSitioUsuarioComponent;

  token: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _compraService: CompraService) { }

  ngOnInit() {
    let param1 = this.activatedRoute.snapshot.params['param1'];
    let param2 = this.activatedRoute.snapshot.params['param2'];
    let self = this;
    self.token = param1;
    self.mensaje.Limpiar();
    this._compraService.VerfificarCompra(self.token)
      .subscribe(data => {
        console.log(data);
        if(data.respuesta.codigo==1){
          self.mensaje.Mensaje(data.respuesta.mensaje, "ok");
        }else{
          self.mensaje.Mensaje(data.respuesta.mensaje, "error");
        }
      });
  }

}

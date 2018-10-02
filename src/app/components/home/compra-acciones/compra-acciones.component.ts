import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompraService } from '../../../services/compra/compra.service';
import { MensajeSitioUsuarioComponent } from '../../shared/mensaje-sitio-usuario/mensaje-sitio-usuario.component';
import { IndicadorCargaComponent } from '../../shared/indicador-carga/indicador-carga.component';
declare function obtenerIdUsuario(): any;
declare function IrAPAgadito(cantidad, descripcion, precio): any;

@Component({
  selector: 'app-compra-acciones',
  templateUrl: './compra-acciones.component.html',
  styleUrls: ['./compra-acciones.component.css']
})
export class CompraAccionesComponent implements OnInit {

  @ViewChild('mensaje') mensaje: MensajeSitioUsuarioComponent;
  @ViewChild(IndicadorCargaComponent) indicador: IndicadorCargaComponent;

  CantidadAcciones: number;
  Empresa = { id_empresa: 0, nombre: "", correo: "", telefono: "", direccion: "", url: "", 
              nit: "", categoria: 0, representante_legal: "" };
  Compra = { precio: 100, cantidad: 0, usuario_modifica: 0 }

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _compraService: CompraService) { }

  IniciarCompraPrueba(){
    //let url = 'http://localhost:8081/Lup/pagadito/pago.php?operacion=inicio&cantidad=100&descripcion=Acciones de prueba&precio=50';
    let url = 'http://45.32.70.155/pagaditolup/pago.php?operacion=inicio&cantidad=100&descripcion=Acciones de prueba&precio=50';
    //this.router.navigateByUrl(url);
    //window.location = url;
    window.location.href = url;
  }

  IniciarCompra() {
    //this.mensaje.Mensaje("Mensaje de prueba", "advertencia");

    var self = this;
    self.mensaje.Limpiar();
    if (this.Compra.cantidad == 0) {
      this.mensaje.Mensaje("Ingrese cantidad de acciones a comprar", "error");
    } else {
      self.indicador.Inicio();
      self.Compra.usuario_modifica = obtenerIdUsuario();
      this._compraService.IniciarCompra({ compra: self.Compra })
        .subscribe(data => {
          self.indicador.Fin();
          if (data.code == 1) {
            self.mensaje.Mensaje(data.message, "ok");
            setInterval( IrAPAgadito(self.Compra.cantidad, 'Acciones Lup', self.Compra.precio) , 3000);
          } else {
            self.mensaje.Mensaje(data.message, "error");
          }
        });
    }




  }

  ngOnInit() {
    
  }

}



import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  strTitulo:string = "Conoce <Empresa>";
  strImg:string = "/img/Nosotros/por1.jpg"

  constructor() { }

  ngOnInit() {

    window.scrollTo(0, 0)

    $(document).ready(function() {
      $("#nosotros2").hide();
      $("#nosotros3").hide();
      $("#nosotros1").collapse('toggle');

   });

  }

  Cambio( lngCambio ){

    if (lngCambio == 1){
      this.strTitulo = "Conoce <Empresa>";
      this.strImg = "/img/Nosotros/por1.jpg";

      $("#nosotros2").collapse('hide');
      $("#nosotros3").collapse('hide');

    }
    if (lngCambio == 2){
      this.strTitulo = "Economía";
      this.strImg = "/img/Nosotros/por2.jpg";

      $("#nosotros1").collapse('hide');
      $("#nosotros3").collapse('hide');
      $("#nosotros2").show();
    }
    if (lngCambio == 3){
      this.strTitulo = "Acciones";
      this.strImg = "/img/Nosotros/por3.jpg";

      $("#nosotros1").collapse('hide');
      $("#nosotros2").collapse('hide');
      $("#nosotros3").show();
    }
  }

}

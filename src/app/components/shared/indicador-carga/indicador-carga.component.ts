import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicador-carga',
  templateUrl: './indicador-carga.component.html',
  styleUrls: ['./indicador-carga.component.css']
})
export class IndicadorCargaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  Inicio(){
    $('#mdLoading').modal('show');
  }

  Fin(){
    setInterval(function(){ $('#mdLoading').modal('hide'); }, 2000);
  }

}

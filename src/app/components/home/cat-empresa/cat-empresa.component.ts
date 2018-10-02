import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators,NgModel } from '@angular/forms';

@Component({
  selector: 'app-cat-empresa',
  templateUrl: './cat-empresa.component.html',
  styleUrls: ['./cat-empresa.component.css']
})
export class CatEmpresaComponent implements OnInit {


  //Seguridad
  identity:any;
  token:any;

  //Cargar
  strCategoria:any;

  forma:FormGroup;

  constructor(private _loginService:LoginService,
              private router:Router,
              private _categoriaService:CategoriaService) {

                // Obtener variables del localStorage INICIO
                this.identity = this._loginService.getIdentity();
                this.token = this._loginService.getToken();

                if(this.identity==null){
                  this.router.navigate(['/ErrLog']);
                }
                //  Obtener variables del localStorage FIN


                //Controles de Formularios
                this.forma = new FormGroup({
                  'categoria': new FormControl('',Validators.required)
                })

                //Forma 1
                this.forma.controls['categoria'].valueChanges
                    .subscribe( data =>{
                        console.log(data);

                      this._categoriaService.getCategoria(this.token, data)
                        .subscribe( data=>{

                           this.strCategoria = data.data.body;

                        })
                    })

  }

  ngOnInit() {

      this.CargarCategoria();

  }

  CargarCategoria(){

    this._categoriaService.getCategoria(this.token, "")
    .subscribe( data=>{

       this.strCategoria = data.data.body;

    })
  }

  CatEmpresa(id, nombre){
    console.log("sadf: " + id)
          this.router.navigate(['/SubEmp', id, nombre]);
  }

}

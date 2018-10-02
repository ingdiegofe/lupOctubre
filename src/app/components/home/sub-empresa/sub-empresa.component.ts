import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { LoginService } from '../../../services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,NgModel } from '@angular/forms';

@Component({
  selector: 'app-sub-empresa',
  templateUrl: './sub-empresa.component.html',
  styleUrls: ['./sub-empresa.component.css']
})
export class SubEmpresaComponent implements OnInit {

  //Seguridad
  identity:any;
  token:any;

  //Cargar
  strEmpresa:any;
  lngCategoria:any;
  lngTitulo:any;

  forma:FormGroup;

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private _empresaService:EmpresaService,
              private _loginService:LoginService) {

                // Obtener variables del localStorage INICIO
                this.identity = this._loginService.getIdentity();
                this.token = this._loginService.getToken();

                if(this.identity==null){
                  this.router.navigate(['/ErrLog']);
                }
                //  Obtener variables del localStorage FIN

                this.activatedRoute.params.subscribe( params =>{
                  this.CargarEmpresas(params['idCat']);
                  this.lngCategoria = params['idCat'];
                  this.lngTitulo = params['cat']
                })


                //Controles de Formularios
                this.forma = new FormGroup({
                  'empresa': new FormControl('',Validators.required)
                })

                //Forma 1
                this.forma.controls['empresa'].valueChanges
                    .subscribe( data =>{

                        this._empresaService.getEmpresa(this.token, data , this.lngCategoria)
                        .subscribe( data=>{

                           this.strEmpresa = data.data.body;

                        })

                    })

            }

  ngOnInit() {
  }

  IrACompraAcciones(empresa){
    this.router.navigate(['CompAcc/' + empresa.id_empresa ]);
  }

  Empresa(){
          this.router.navigate(['/Emp']);
  }

  CargarEmpresas(id){
    this._empresaService.getEmpresa(this.token, "", id)
    .subscribe( data=>{

       this.strEmpresa = data.data.body;

    })
  }

}

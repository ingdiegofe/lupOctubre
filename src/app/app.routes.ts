import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/inicio/home/home.component';
import { FaqComponent } from './components/inicio/faq/faq.component';
import { AyudaComponent } from './components/inicio/ayuda/ayuda.component';
import { NosotrosComponent } from './components/inicio/nosotros/nosotros.component';
import { RegistrarComponent } from './components/inicio/registrar/registrar.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { ConfComponent } from './components/home/conf/conf.component';
import { CatEmpresaComponent } from './components/home/cat-empresa/cat-empresa.component';
import { SubEmpresaComponent } from './components/home/sub-empresa/sub-empresa.component';
import { EmpresaComponent } from './components/home/empresa/empresa.component';
import { AccionComponent } from './components/home/accion/accion.component';
import { BlogComponent } from './components/home/blog/blog.component';
import { HomeeComponent } from './components/AdmEmpresa/homee/homee.component';
import { HomelComponent } from './components/AdmLup/homel/homel.component';
import { MantenimientoEmpresasComponent } from './components/AdmLup/mantenimiento-empresas/mantenimiento-empresas.component';
import { FormularioEmpresaComponent } from './components/AdmLup/formulario-empresa/formulario-empresa.component';
import { MantenimientoUsuariosComponent } from './components/AdmLup/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { FormularioUsuarioComponent } from './components/AdmLup/formulario-usuario/formulario-usuario.component';
import { MantenimientoPersonasComponent } from './components/AdmLup/mantenimiento-personas/mantenimiento-personas.component';
import { FormularioPersonaComponent } from './components/AdmLup/formulario-persona/formulario-persona.component';
import { MantenimientoNoticiasComponent } from './components/AdmLup/mantenimiento-noticias/mantenimiento-noticias.component';
import { FormularioNoticiaComponent } from './components/AdmLup/formulario-noticia/formulario-noticia.component';
import { CompraAccionesComponent } from './components/home/compra-acciones/compra-acciones.component';
import { ProcesarCompraComponent } from './components/home/procesar-compra/procesar-compra.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'conf', component: ConfComponent },
  { path: 'CatEmp', component: CatEmpresaComponent },
  { path: 'SubEmp/:idCat/:cat', component: SubEmpresaComponent },
  { path: 'Emp', component: EmpresaComponent },
  { path: 'Accion', component: AccionComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'homeE', component: HomeeComponent },
  { path: 'homeL', component: HomelComponent },
  { path: 'mantE', component: MantenimientoEmpresasComponent },
  { path: 'formE/:operacion/:idempresa', component: FormularioEmpresaComponent },
  { path: 'mantU', component: MantenimientoUsuariosComponent },
  { path: 'formU/:operacion/:idusuario', component: FormularioUsuarioComponent },
  { path: 'mantP', component: MantenimientoPersonasComponent },
  { path: 'formP/:operacion/:idpersona', component: FormularioPersonaComponent },
  { path: 'mantN', component: MantenimientoNoticiasComponent },
  { path: 'formN/:operacion/:idpersona', component: FormularioNoticiaComponent },
  { path: 'CompAcc/:idempresa', component: CompraAccionesComponent },
  { path: 'procCompra/parametro1/:param1/parametro2/:param2', component: ProcesarCompraComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:false});

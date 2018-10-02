import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import * as bootstrap from "bootstrap";

//Rutas
import { APP_ROUTING } from './app.routes';

//servicios
import { Globals } from './globals';
import { LoginService } from './services/login/login.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { EmailService } from './services/email/email.service';
import { PaisService } from './services/pais/pais.service';
import { PersonaService } from './services/persona/persona.service';
import { AdminEmpresasService } from './services/admin/admin-empresas/admin-empresas.service';
import { AdminUsuariosService } from './services/admin/admin-usuarios/admin-usuarios.service';
import { AdminPersonasService } from './services/admin/admin-personas/admin-personas.service';
import { AdminNoticiasService } from './services/admin/admin-noticias/admin-noticias.service';
import { NoticiaService } from './services/noticia/noticia.service';
import { CategoriaService } from './services/categoria/categoria.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { CompraService } from './services/compra/compra.service';


import { AppComponent } from './app.component';
import { NavbarInComponent } from './components/shared/navbar-in/navbar-in.component';
import { NavbarLogComponent } from './components/shared/navbar-log/navbar-log.component';
import { CarouselComponent } from './components/inicio/carousel/carousel.component';
import { HomeComponent } from './components/inicio/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContenidoComponent } from './components/inicio/contenido/contenido.component';
import { FaqComponent } from './components/inicio/faq/faq.component';
import { AyudaComponent } from './components/inicio/ayuda/ayuda.component';
import { NosotrosComponent } from './components/inicio/nosotros/nosotros.component';
import { DomseguroPipe } from './pipe/domseguro.pipe';
import { RegistrarComponent } from './components/inicio/registrar/registrar.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { InicioComponent } from './components/home/inicio/inicio.component';
import { IzquierdaComponent } from './components/home/izquierda/izquierda.component';
import { CentroComponent } from './components/home/centro/centro.component';
import { DerechaComponent } from './components/home/derecha/derecha.component';
import { ConfComponent } from './components/home/conf/conf.component';
import { EmpresaComponent } from './components/home/empresa/empresa.component';
import { CatEmpresaComponent } from './components/home/cat-empresa/cat-empresa.component';
import { SubEmpresaComponent } from './components/home/sub-empresa/sub-empresa.component';
import { AccionComponent } from './components/home/accion/accion.component';
import { BlogComponent } from './components/home/blog/blog.component';
import { HomelComponent } from './components/AdmLup/homel/homel.component';
import { HomeeComponent } from './components/AdmEmpresa/homee/homee.component';
import { NavbarAdminComponent } from './components/shared/navbar-admin/navbar-admin.component';
import { MantenimientoEmpresasComponent } from './components/AdmLup/mantenimiento-empresas/mantenimiento-empresas.component';
import { FormularioEmpresaComponent } from './components/AdmLup/formulario-empresa/formulario-empresa.component';
import { LoaderAdminComponent } from './components/shared/loader-admin/loader-admin.component';
import { MensajeAdminComponent } from './components/shared/mensaje-admin/mensaje-admin.component';
import { MantenimientoUsuariosComponent } from './components/AdmLup/mantenimiento-usuarios/mantenimiento-usuarios.component';
import { FormularioUsuarioComponent } from './components/AdmLup/formulario-usuario/formulario-usuario.component';
import { MantenimientoPersonasComponent } from './components/AdmLup/mantenimiento-personas/mantenimiento-personas.component';
import { FormularioPersonaComponent } from './components/AdmLup/formulario-persona/formulario-persona.component';
import { MantenimientoNoticiasComponent } from './components/AdmLup/mantenimiento-noticias/mantenimiento-noticias.component';
import { FormularioNoticiaComponent } from './components/AdmLup/formulario-noticia/formulario-noticia.component';
import { CompraAccionesComponent } from './components/home/compra-acciones/compra-acciones.component';
import { MensajeSitioUsuarioComponent } from './components/shared/mensaje-sitio-usuario/mensaje-sitio-usuario.component';
import { IndicadorCargaComponent } from './components/shared/indicador-carga/indicador-carga.component';
import { ProcesarCompraComponent } from './components/home/procesar-compra/procesar-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarInComponent,
    NavbarLogComponent,
    CarouselComponent,
    HomeComponent,
    FooterComponent,
    ContenidoComponent,
    FaqComponent,
    AyudaComponent,
    NosotrosComponent,
    DomseguroPipe,
    RegistrarComponent,
    LoginComponent,
    InicioComponent,
    IzquierdaComponent,
    CentroComponent,
    DerechaComponent,
    ConfComponent,
    EmpresaComponent,
    CatEmpresaComponent,
    SubEmpresaComponent,
    AccionComponent,
    BlogComponent,
    HomelComponent,
    HomeeComponent,
    NavbarAdminComponent,
    MantenimientoEmpresasComponent,
    FormularioEmpresaComponent,
    LoaderAdminComponent,
    MensajeAdminComponent,
    MantenimientoUsuariosComponent,
    FormularioUsuarioComponent,
    MantenimientoPersonasComponent,
    FormularioPersonaComponent,
    MantenimientoNoticiasComponent,
    FormularioNoticiaComponent,
    CompraAccionesComponent,
    MensajeSitioUsuarioComponent,
    IndicadorCargaComponent,
    ProcesarCompraComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    Globals,
    LoginService,
    UsuarioService,
    EmailService,
    PaisService,
    PersonaService,
    AdminEmpresasService,
    AdminUsuariosService,
    AdminPersonasService,
    AdminNoticiasService,
    NoticiaService,
    CategoriaService,
    EmpresaService,
    CompraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

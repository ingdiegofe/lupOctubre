import { Injectable } from '@angular/core';

@Injectable()
export class Globals{
  url:string;
  Login:string;
  Usuario: string;
  Email:string;
  Pais:string;
  UsuarioR:string;
  Persona:string;
  MantEmpresas: string;
  MantUsuarios: string;
  MantPersonas: string;
  MantNoticias: string;
  Noticia: string;
  Categoria: string;
  Empresa: string;
  Compra: string;

  //LUP
  vision:string;
  mision:string;
  valores:string;
  historia:string;


  constructor(){
    this.url = "http://localhost:3010";
    this.Login = this.url + "/login";
    this.Usuario = this.url + "/ad/usuario";
    this.UsuarioR = this.url + "/ad/usuario_registro";
    this.Persona = this.url + "/ad/persona";
    this.Pais = this.url + "/ad/pais";
    this.Email = this.url + "/correo";
    this.MantEmpresas = this.url + "/admin-empresas";
    this.MantUsuarios = this.url + "/admin-usuarios";
    this.MantPersonas = this.url + "/admin-personas";
    this.MantNoticias = this.url + "/admin-noticias";
    this.Noticia = this.url + "/in/noticia";
    this.Categoria = this.url + "/in/categoria";
    this.Empresa = this.url + "/in/empresa";
    this.Compra = this.url + "/compra-pagadito";

    this.vision = "Ser el principal motor del \
                  mercado econ�mico a nivel mundial, impulsando al emprendedor  \
                  de peque�a y mediana empresa a cumplir sus sue�os y prop�sitos \
                   con ayuda colectiva."


    this.mision = "Crear el impulso financiero mediante puentes econ�micos. \
                  Ofreciendo herramientas tecnol�gicas para inversionistas y empresas."

    this.valores = "Trabajamos mediante valores y una �tica moral que nos permite  " +
                  "tener la confianza de nuestros socios, accionistas e inversionistas " +
                  "como podemos mencionar algunos pilares de nuestra entidad: <br> " +
                  "<li> SERVICIOS DE INFORMACI�N GLOBAL y TENDENCIAS MACRO Y MICRO ECONOMICAS. <\li>" +
                  "<li> SOLUCIONES CORPORATIVAS<\li> " +
                  "<li> ASESORIAS ESTRATEGICAS <\li>" +
                  "<li> APORTE TECNOLOGICO <\li> " +
                  "<li> INNOVACI�N <\li> " +
                  "<li> HONESTIDAD <\li> " +
                  "<li> JUSTICIA <\li>";


    this.historia = "LUP�� es una entidad creada para ser el laso, conexi�n y  \
                    puente financiero entre el inversionista y la peque�a y mediana empresa.  \
                    Nuestros principales aliados son los emprendedores que buscan \
                    cambiar la direcci�n del pa�s, mediante la creaci�n de nuevos \
                    puestos de trabajo e iniciativas relevantes que den una mayor \
                    generaci�n de frutos econ�micamente sostenibles en el tiempo. \
                    INVERSIONITAS: \
                    Nuestro principal objetivo es dar al socio inversionista una amplia gama de oportunidades de inversi�n y asesor�a empresarial para generar una sana inversi�n que perdure mediante valiosa informaci�n para una toma de decisiones con riesgo calculado.\
                    Empresas cotizadas: \
                    Buscamos empresas con un valor agregado en el mercado, con ideas retadoras y deseo de �xito total.  \
                    Mediante un an�lisis por profesionales en la materia; nuestro mayor deseo es hacer que los sue�os de aquellos empresarios-emprendedores sean realidad. "

  }
}

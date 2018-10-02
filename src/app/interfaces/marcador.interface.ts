export interface Marcador{
  lat:number;
  lng:number;
  direccion?: string;
  horario?: string;
  horario2?: string;
  tel?: string;
}


export interface Identity{
  apellidos: string,
  clave: string,
  dpi: string,
  estado: number,
  fecha_ingreso: string,
  id_tipo_usuario: string,
  id_usuario: number,
  logeado: number,
  nombre: string,
  nombres: string,
  reinicio: number,
  token: string
}

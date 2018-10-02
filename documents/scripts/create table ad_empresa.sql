create table ad_empresa(
	id_empresa int GENERATED ALWAYS AS IDENTITY primary key,
	nombre varchar(200) not null,
	correo varchar(50) null,
	telefono varchar(50) null,
	direccion varchar(200) null,
	url varchar(300) null,
	fecha_creacion timestamp with time zone,
	estado int,
	fecha_modificacion timestamp with time zone,
	usuario_modifica integer,
	representante_legal varchar(100),
	nit varchar(20),
	categoria int not null,
	FOREIGN KEY (categoria) REFERENCES ad_categoria_empresa(id_categoria_empresa)
);

create table ad_noticia(
	id_noticia int GENERATED ALWAYS AS IDENTITY primary key,
	titulo varchar(100) not null,
	texto text not null,
	imagen text null,
	fecha_creacion timestamp not null,
	fecha_modificacion timestamp not null,
	usuario_modifica int null
)

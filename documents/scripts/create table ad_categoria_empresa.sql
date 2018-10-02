
create table ad_categoria_empresa(
	id_categoria_empresa int GENERATED ALWAYS AS IDENTITY primary key,
	nombre varchar(200) not null
);


insert into ad_categoria_empresa (nombre) values('Agricultura');
insert into ad_categoria_empresa (nombre) values('Tecnología');
insert into ad_categoria_empresa (nombre) values('Telefonía');
insert into ad_categoria_empresa (nombre) values('Ropa');
insert into ad_categoria_empresa (nombre) values('Restaurante');

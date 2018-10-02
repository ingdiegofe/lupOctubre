
create table ad_compra(
    id_compra int generated always as identity primary key,
    fecha_compra timestamp with time zone,
    usuario int not null,
    estado int not null,
    mensaje varchar(500) null,
    token_pagadito text null,
    cantidad int not null,
    precio float not null,
    total float not null,
    FOREIGN KEY (usuario) REFERENCES ad_usuario(id_usuario)
);

-- estado 
-- 1 iniciado, 2 completado, 3 rechazado


/*
create table ad_compra(
    id_compra int generated always as identity primary key,
    fecha_compra timestamp with time zone,
    usuario int not null,
    estado int not null,
    mensaje varchar(500) null,
    payerid varchar(200) null,
    paymentid varchar(200) null,
    total float not null,
    comision_paypal float null,
    trama_respuesta text,
    FOREIGN KEY (usuario) REFERENCES ad_usuario(id_usuario)
);
*/


-- estado 
-- 1 iniciado, 2 pre aprobado, 3 rechazado, 4 completado


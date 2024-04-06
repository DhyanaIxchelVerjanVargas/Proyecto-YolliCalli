SELECT u.nombre_Completo AS nombre_usuario, 
       p.nombreProducto AS nombre_producto, 
       p.descripcion AS descripcion_producto,
       p.talla as talla,
       c.total AS total,
       d.calle_numero AS calle_envio, 
       d.colonia AS colonia_envio,
       d.municipio AS municipio_envio, 
       d.estado AS estado_envio, 
       d.cp AS cp_envio
FROM usuario u
JOIN compra c ON u.idUsuario = c.usuario_idUsuario
JOIN productos p ON c.idProductos = p.idProductos
JOIN direccion d ON c.idDireccion = d.idDireccion
WHERE c.idCompra <=5;
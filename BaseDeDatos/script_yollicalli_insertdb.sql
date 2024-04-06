INSERT INTO categorias (nombreCategoria) VALUES 
('Alimentos'),
('Ropa'),
('Accesorios para el hogar'),
('Joyería'),
('Cuidado personal'),
('Muebles');

INSERT INTO direccion (calle_numero, colonia, municipio, estado, cp) VALUES 
('San Julio 13', 'Santa ursula', 'Tlalpan', 'CDMX', '25418'),
('San Jeronimo 5', 'Centro', 'Ecatepec', 'Edo de México', '32548'),
('Tata Jesucristo 59', 'San Lorenzo', 'Iztapalapa', 'CDMX', '09900'),
('San Benito', 'Santa Rivera', 'Xochimilco', 'CDMX', '14240'),
('San Carlos', 'Santa Cecilia', 'Milpa Alta', 'CDMX', '13657');

INSERT INTO usuario (nombre_Completo, contrasenia, telefono, correo, idDireccion) VALUES 
('Jetsael', '12345678', '2345678909', 'jetsa@example.com', 1),
('Edgar', 'contraseni1', '5586993048', 'edgar@example.com', 2),
('Ulises',  'contraseni2', '5524222051', 'ulises@example.com', 3),
('Dhyana', 'contraseni3', '5558455219', 'dhyana@example.com', 4),
('Nadia', 'contraseni4', '5530354045', 'nadia@example.com', 5);

-- NOTA: en la columna de imágenes se colocarán los URL de las mismas.
INSERT INTO productos (nombreProducto, idCategoria, descripcion, precio, imagen, destacado, cantidad, talla) VALUES 
('Mantel', 3, 'Bordado por artesanos de Chiapas', 599.99, 'mantel.jpg', 1, 15, ''), 
('Camisa', 2, 'Camisa de algodón de manga corta', 29.99, 'camisa.jpg', 0, 100, 'mediana'),
('Florero', 3, 'Florero de talavera', 49.99, 'florero.jpg', 1, 30, ''),
('Jabón artesanal', 5, 'Jabón de carbón para el rostro', 5.99, 'jabon.jpg', 0, 200, ''),
('Mezcal', 1, 'Mezcal de Oaxaca', 500.99, 'Mezcal.jpg', 0, 100, '');

INSERT INTO compra (usuario_idUsuario, idCompra, idDireccion, idProductos,subtotal, envio, total) VALUES 
(1, 1, 1, 3, 99.98, 10.00, 109.98),
(2, 2, 2, 5, 500.99, 5.00, 505.99),
(3, 3, 3, 2, 59.98, 10.00, 69.98),
(4, 4, 4, 1, 1197.98, 10.00, 1207.98),
(5, 5, 5, 4, 11.98, 10.00, 21.98);

INSERT INTO metodo_pago (nombreMetodo) VALUES 
('Tarjeta de crédito'),
('PayPal'),
('Transferencia bancaria');

INSERT INTO detalle_pago (idCompra, idMetodoPago, idDireccion, monto) VALUES 
(1, 1, 1, 109.98),
(2, 2, 2, 505.99),
(3, 3, 3, 69.98),
(4, 2, 4, 1207.98),
(5, 1, 5, 21.98);

INSERT INTO resumen_pedido (idUsuario, idCompra, idMetodoPago, idDireccion, estadoPedido) VALUES 
(1, 1, 1, 1, 'En proceso'),
(2, 2, 2, 2, 'En proceso'),
(3, 3, 3, 3, 'En proceso'),
(4, 4, 2, 4, 'En proceso'),
(5, 5, 1, 5, 'En proceso');
-- Se elimina DB en caso de existir:
DROP DATABASE IF EXISTS `yollicalli_db` ;

-- Crear DB:
CREATE DATABASE IF NOT EXISTS `yollicalli_db`;

USE `yollicalli_db` ;

-- Crear tabla de categorías:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`categorias` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `nombreCategoria` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idCategoria`));

-- Crear tabla de direcciones:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`direccion` (
  `idDireccion` INT NOT NULL AUTO_INCREMENT,
  `calle_numero` VARCHAR(120) NOT NULL,
  `colonia` VARCHAR(50) NOT NULL,
  `municipio` VARCHAR(50) NOT NULL,
  `estado` VARCHAR(50) NOT NULL,
  `cp` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`idDireccion`));

-- Crear tabla de usuarios:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre_Completo` VARCHAR(50) NOT NULL,
  `contrasenia` VARCHAR(255) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `foto` VARCHAR(150) NOT NULL default "https://res.cloudinary.com/dhanxnsiv/image/upload/v1710969357/fotoDePerfilPorDefecto.png", 
  `idDireccion` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `idDireccion`),
  UNIQUE INDEX `correo` (`correo` ASC) VISIBLE,
  INDEX `idx_usuario_direccion` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_usuario_direccion1_idx` (`idDireccion` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_direccion1`
    FOREIGN KEY (`idDireccion`)
    REFERENCES `yollicalli_db`.`direccion` (`idDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Crear tabla de lista de productos:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`productos` (
  `idProductos` INT NOT NULL AUTO_INCREMENT,
  `nombreProducto` VARCHAR(100) NOT NULL,
  `idCategoria` INT NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `imagen` VARCHAR(500) NOT NULL,
  `talla` VARCHAR(20),
  `destacado` BIT(1) NOT NULL DEFAULT b'0',
  `cantidad` INT NOT NULL,
  PRIMARY KEY (`idProductos`, `idCategoria`),
  INDEX `fk_productos_categorias1_idx` (`idCategoria` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categorias1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `yollicalli_db`.`categorias` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Crear tabla de compras:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`compra` (
  `usuario_idUsuario` INT NOT NULL,
  `idCompra` INT NOT NULL,
  `idDireccion` INT NOT NULL,
  `idProductos` INT NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  `envio` DECIMAL(10,2) NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idCompra`, `idDireccion`, `idProductos`),
  INDEX `fk_compra_direccion1_idx` (`idDireccion` ASC) VISIBLE,
  INDEX `fk_compra_usuario1_idx` (`usuario_idUsuario` ASC) VISIBLE,
  INDEX `fk_compra_productos1_idx` (`idProductos` ASC) VISIBLE,
  CONSTRAINT `fk_compra_direccion1`
    FOREIGN KEY (`idDireccion`)
    REFERENCES `yollicalli_db`.`direccion` (`idDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_usuario1`
    FOREIGN KEY (`usuario_idUsuario`)
    REFERENCES `yollicalli_db`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compra_productos1`
    FOREIGN KEY (`idProductos`)
    REFERENCES `yollicalli_db`.`productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Crear tabla de método de pago:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`metodo_pago` (
  `idMetodoPago` INT NOT NULL AUTO_INCREMENT,
  `nombreMetodo` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idMetodoPago`));

-- Crear tabla de detalles de pago:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`detalle_pago` (
  `idDetallePago` INT NOT NULL AUTO_INCREMENT,
  `idCompra` INT NOT NULL,
  `idMetodoPago` INT NOT NULL,
  `idDireccion` INT NOT NULL,
  `monto` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idDetallePago`, `idCompra`, `idMetodoPago`, `idDireccion`),
  INDEX `fk_detalle_pago_compra1_idx` (`idCompra` ASC, `idDireccion` ASC) VISIBLE,
  INDEX `fk_detalle_pago_metodo_pago1_idx` (`idMetodoPago` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_pago_compra1`
    FOREIGN KEY (`idCompra` , `idDireccion`)
    REFERENCES `yollicalli_db`.`compra` (`idCompra` , `idDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_pago_metodo_pago1`
    FOREIGN KEY (`idMetodoPago`)
    REFERENCES `yollicalli_db`.`metodo_pago` (`idMetodoPago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Crear tabla de resumen de pedido:
CREATE TABLE IF NOT EXISTS `yollicalli_db`.`resumen_pedido` (
  `idResumen` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idCompra` INT NOT NULL,
  `idMetodoPago` INT NOT NULL,
  `idDireccion` INT NOT NULL,
  `fechaPedido` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoPedido` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idResumen`, `idUsuario`, `idCompra`, `idMetodoPago`, `idDireccion`),
  INDEX `fk_resumen_pedido_direccion1_idx` (`idDireccion` ASC) VISIBLE,
  INDEX `fk_resumen_pedido_compra1_idx` (`idCompra` ASC) VISIBLE,
  INDEX `fk_resumen_pedido_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_resumen_pedido_metodo_pago1_idx` (`idMetodoPago` ASC) VISIBLE,
  CONSTRAINT `fk_resumen_pedido_direccion1`
    FOREIGN KEY (`idDireccion`)
    REFERENCES `yollicalli_db`.`direccion` (`idDireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resumen_pedido_compra1`
    FOREIGN KEY (`idCompra`)
    REFERENCES `yollicalli_db`.`compra` (`idCompra`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resumen_pedido_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `yollicalli_db`.`usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resumen_pedido_metodo_pago1`
    FOREIGN KEY (`idMetodoPago`)
    REFERENCES `yollicalli_db`.`metodo_pago` (`idMetodoPago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

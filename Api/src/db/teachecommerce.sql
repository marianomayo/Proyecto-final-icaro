-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: teachecommerce
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `vnombre` varchar(60) NOT NULL,
  `vapellido` varchar(60) NOT NULL,
  `vemail` varchar(255) NOT NULL,
  `vpassword` varchar(100) NOT NULL,
  `bhabilitado` tinyint DEFAULT '1',
  PRIMARY KEY (`id_administrador`),
  UNIQUE KEY `pk_id_administrador` (`id_administrador`),
  UNIQUE KEY `vemail_UNIQUE` (`vemail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Mariano','Mayo','mariano@gmail.com','123456',1),(2,'Mariano Prueba ','Mayo Santillan Prueba','mariano2@gmail.com','$2b$10$FvMhEN3skeFwvj12ZVXs9udunyesUZb2KAdW.JL2X1TTKJfXh6Jsu',1),(3,'Mariano Prueba ','Mayo Santillan Prueba','mariano1@gmail.com','$2b$10$mGBrE2X8GqYSqUeyDbxESOv1hZnyaHg0lbsb4D3.02.8996WE6jua',1);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idcategoria` int NOT NULL AUTO_INCREMENT,
  `vcategoria` varchar(150) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Notebook'),(2,'Celulares'),(3,'Auriculares'),(4,'Cables');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarioxproducto`
--

DROP TABLE IF EXISTS `comentarioxproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarioxproducto` (
  `idcomentarioxproducto` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_usuario` int NOT NULL,
  `tcomentario` text,
  `nrate` int DEFAULT NULL,
  PRIMARY KEY (`idcomentarioxproducto`),
  KEY `fk_comentarioxproducto_producto_idx` (`id_producto`),
  KEY `fk_comentarioxproducto_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_comentarioxproducto_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_comentarioxproducto_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarioxproducto`
--

LOCK TABLES `comentarioxproducto` WRITE;
/*!40000 ALTER TABLE `comentarioxproducto` DISABLE KEYS */;
INSERT INTO `comentarioxproducto` VALUES (1,5,17,'Comentario agregado desde postman, la idea es que sea un comentario medio extenso pero no rompa nada',4),(2,5,18,'Segundo Comentario agregado desde postman, la idea es que sea un comentario medio extenso pero no rompa nada',3),(3,2,17,'dsadsa',3),(4,2,17,'Comentario numero 2',5),(5,2,17,'Comentario numero 3',1),(6,2,17,'Comentario numero 4',2),(7,2,17,'Comentario numero 5',5),(8,2,17,'comentario sasraasas',3),(9,2,17,'segundo ',5),(10,2,17,'dasdas',3),(11,2,18,'dasdsadasdasdasdas',4),(12,2,18,'dsfsdfs',5),(13,2,18,'Comentario y borrado',5),(14,2,18,'ds',3),(15,3,18,'comentario',4);
/*!40000 ALTER TABLE `comentarioxproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorito`
--

DROP TABLE IF EXISTS `favorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorito` (
  `idfavorito` int NOT NULL AUTO_INCREMENT,
  `id_producto` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`idfavorito`),
  KEY `fk_favorito_producto_idx` (`id_producto`),
  KEY `fk_favorito_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_favorito_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_favorito_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
INSERT INTO `favorito` VALUES (7,6,18),(15,3,18),(16,1,18),(17,4,18);
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id_marca` int NOT NULL AUTO_INCREMENT,
  `vmarca` varchar(45) DEFAULT NULL,
  `bhabilitado` tinyint NOT NULL DEFAULT '1',
  `vdescripcion` mediumtext,
  `vpath` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id_marca`),
  UNIQUE KEY `pk_id_marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Apple',1,'Apple, Inc. es una empresa tecnológica multinacional estadounidense con sede en Cupertino, California. Apple es la empresa de tecnología más grande del mundo por ingresos, con US$394,3 mil millones de dólares en ingresos en 2022.','https://picsum.photos/300/300'),(2,'Msi',1,'Como marca de juegos líder mundial, MSI es el nombre más confiable en juegos y deportes electrónicos. Han dedicado innumerables horas y numerosos recursos a la comunidad de deportes electrónicos para apoyar a los jugadores más aspirantes del mundo y aprovechar su experiencia en juegos para optimizar el diseño de nuestros productos.','https://picsum.photos/300/300'),(3,'Logitech',1,'Una empresa suiza centrada en la innovación y la calidad, Logitech diseña productos y experiencias que tienen un lugar cotidiano en la vida de las personas. Durante más de 40 años, han expandido tanto su experiencia en diseño de productos como su alcance global.','https://picsum.photos/300/300'),(4,'Dell',1,'Son un equipo diverso con perspectivas únicas.Impulsado por la ambición y el poder de la tecnología para fomentar el progreso humano. Inquebrantable en el compromiso con la igualdad, la confianza y el apoyo mutuos.','https://picsum.photos/300/300'),(5,'Gigabyte',1,'La descripcion de gigabyte','https://picsum.photos/300/300');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden_compra`
--

DROP TABLE IF EXISTS `orden_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_compra` (
  `idorden_compra` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `tscreado` datetime DEFAULT CURRENT_TIMESTAMP,
  `bprocesado` tinyint DEFAULT '0',
  `tsprocesado` datetime DEFAULT NULL,
  PRIMARY KEY (`idorden_compra`),
  KEY `fk_ordencompra_usuario_idx` (`id_usuario`),
  CONSTRAINT `fk_ordencompra_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_compra`
--

LOCK TABLES `orden_compra` WRITE;
/*!40000 ALTER TABLE `orden_compra` DISABLE KEYS */;
INSERT INTO `orden_compra` VALUES (16,17,'2024-01-17 18:48:35',1,'2024-01-18 20:12:39'),(17,18,'2024-01-18 20:13:26',1,'2024-01-18 20:13:41'),(18,17,'2024-01-18 22:14:49',1,'2024-01-22 12:24:17'),(25,18,'2024-01-30 19:38:23',1,'2024-01-30 19:45:34'),(26,17,'2024-01-30 21:31:06',1,'2024-01-30 21:37:33');
/*!40000 ALTER TABLE `orden_compra` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_bprocesado` AFTER UPDATE ON `orden_compra` FOR EACH ROW BEGIN
    IF NEW.bprocesado = 1 AND OLD.bprocesado = 0 THEN
        CALL actualizarProductosDespuesDeProcesarPedido(NEW.idorden_compra);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orden_compra_x_producto`
--

DROP TABLE IF EXISTS `orden_compra_x_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden_compra_x_producto` (
  `idorden_compra_x_producto` int NOT NULL AUTO_INCREMENT,
  `id_orden_compra` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `ncantidad` int DEFAULT NULL,
  PRIMARY KEY (`idorden_compra_x_producto`),
  KEY `fk_ordencompraxproducto_orden_idx` (`id_orden_compra`),
  KEY `fk_ordencompraxproducto_producto_idx` (`id_producto`),
  CONSTRAINT `fk_ordencompraxproducto_orden` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra` (`idorden_compra`),
  CONSTRAINT `fk_ordencompraxproducto_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden_compra_x_producto`
--

LOCK TABLES `orden_compra_x_producto` WRITE;
/*!40000 ALTER TABLE `orden_compra_x_producto` DISABLE KEYS */;
INSERT INTO `orden_compra_x_producto` VALUES (32,16,4,1),(34,16,2,5),(36,17,2,5),(37,18,3,1),(38,18,1,2),(48,25,14,2),(49,25,3,2),(50,26,1,1);
/*!40000 ALTER TABLE `orden_compra_x_producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orden_compra_x_producto_AFTER_DELETE` AFTER DELETE ON `orden_compra_x_producto` FOR EACH ROW BEGIN
 DECLARE contador INT;
 
    SELECT COUNT(*) INTO contador
    FROM orden_compra_x_producto
    WHERE id_orden_compra = OLD.id_orden_compra;

    IF contador = 0 THEN
        DELETE FROM orden_compra
        WHERE idorden_compra = OLD.id_orden_compra;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int NOT NULL AUTO_INCREMENT,
  `id_orden_compra` int NOT NULL,
  `ftotal` float NOT NULL,
  `tscreado` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bprocesado` tinyint NOT NULL DEFAULT '0',
  `benvio` tinyint DEFAULT '0',
  `tsactualizado` timestamp NULL DEFAULT NULL,
  `bnotificado` tinyint DEFAULT '0',
  PRIMARY KEY (`idpedido`),
  KEY `fk_idordencompra_pedido_idx` (`id_orden_compra`),
  CONSTRAINT `fk_idordencompra_pedido` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra` (`idorden_compra`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (4,16,394586,'2024-01-18 20:12:39',1,0,'2024-01-30 22:57:46',1),(5,17,331000,'2024-01-18 20:13:41',1,1,'2024-01-30 23:05:29',1),(6,18,72520,'2024-01-22 12:24:17',1,1,'2024-01-30 23:05:23',1),(7,25,116840,'2024-01-30 19:45:34',1,1,'2024-01-30 23:05:27',1),(8,26,15000,'2024-01-30 21:37:33',0,0,NULL,0);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_actualizar_tsactualizado` BEFORE UPDATE ON `pedido` FOR EACH ROW BEGIN
    IF NEW.bprocesado = 1 AND old.bprocesado = 0 THEN
        SET NEW.tsactualizado = CURRENT_TIMESTAMP;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `vnombre` varchar(150) NOT NULL,
  `tdescripcion` mediumtext NOT NULL,
  `fprecio` float NOT NULL DEFAULT '0',
  `tscreado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nusuariocreador` int NOT NULL,
  `id_categoria` int NOT NULL DEFAULT '1',
  `id_marca` int NOT NULL,
  `ncantidad` int DEFAULT '0',
  `bhabilitado` tinyint(1) DEFAULT '1',
  `boferta` tinyint DEFAULT '0',
  `tsofertahasta` timestamp NULL DEFAULT NULL,
  `vpath` varchar(250) DEFAULT 'https://picsum.photos/200/300',
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `id_producto_UNIQUE` (`id_producto`),
  KEY `fk_producto_administrador_idx` (`nusuariocreador`),
  KEY `fk_producto_marca_idx` (`id_marca`),
  KEY `fk_producto_categoria_idx` (`id_categoria`),
  CONSTRAINT `fk_producto_administrador` FOREIGN KEY (`nusuariocreador`) REFERENCES `administrador` (`id_administrador`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`idcategoria`),
  CONSTRAINT `fk_producto_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'prueba actualizacion sarasasasasaa dsadsa','celular descripcion actualiza dsadsa',15000,'2023-10-28 22:36:47',1,1,3,12,1,0,'2024-12-31 12:00:00','https://picsum.photos/200/300'),(2,'Notebook Numero 2 modificada desde formulario','descripcion numero 2  enviada desde postm',65000,'2023-10-28 22:38:52',1,4,4,0,1,1,'2024-01-16 09:26:07','https://picsum.photos/200/300'),(3,'Notebook Numero 3 enviada desde postman','Actualizo la descripcion de la notebook numero 3 desde postman, actualizo precio',36520,'2023-10-28 22:39:48',1,1,3,0,1,1,'2024-01-23 20:31:05','https://picsum.photos/200/300'),(4,'celular','celular descripcion',69585.5,'2023-11-02 20:02:26',1,1,2,2,1,0,'2024-12-31 12:00:00','https://picsum.photos/200/300'),(5,'Articulo nuevo','Esta es la descripcion del articulo nuevo',45622.6,'2023-11-08 22:26:50',1,3,2,1,1,0,'2024-12-31 12:00:00','https://picsum.photos/200/300'),(6,'Articulo nuevo prueba','Esta es la descripcion del articulo nuevo',5545.62,'2023-12-23 17:39:35',1,3,2,10,1,0,'2024-12-31 12:00:00','https://picsum.photos/200/300'),(7,'Articulo nuevo postman 29','Esta es la descripcion del articulo nuevo',554.251,'2023-12-29 14:03:43',3,3,2,0,1,1,'2024-01-26 10:02:29','https://picsum.photos/200/300'),(8,'producto agregado desde el formulario','detalle creado desde formulario',100000,'2024-01-16 17:25:51',3,2,1,15,1,0,'2024-12-31 12:00:00','https://picsum.photos/200/300'),(9,'notebook gigabyte','la mas poderosa del mercado',15000000,'2024-01-16 17:31:37',3,3,3,3,1,1,'2024-01-17 14:33:02','https://picsum.photos/200/300'),(10,'Camara Nikon','esa es la descripcion de la camara nikon',500000,'2024-01-26 14:52:39',3,2,1,25,1,0,NULL,'https://picsum.photos/200/300'),(11,'Iphone 14','telefono de iphone',1100000,'2024-01-26 15:04:01',3,2,1,6,1,0,NULL,'https://picsum.photos/200/300'),(12,'iphone 15','descripcion del iphone 15',2000000,'2024-01-26 15:08:24',3,2,1,3,1,0,NULL,'https://picsum.photos/200/300'),(13,'iphone 10','dasdasdasdsadsadsa',100000,'2024-01-26 15:32:15',3,2,1,3,1,0,NULL,'https://picsum.photos/200/300'),(14,'Ultimo Producto','prueba ultimo producto',21000,'2024-01-26 15:51:25',3,3,3,30,1,1,'2024-02-10 16:37:18','https://picsum.photos/200/300'),(15,'segunda prueba','sa46d54as65dsa21',12000,'2024-01-26 15:51:44',3,4,5,3,1,0,NULL,'https://picsum.photos/200/300');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `vnombre` varchar(150) NOT NULL,
  `vapellido` varchar(150) NOT NULL,
  `dnacimiento` date NOT NULL,
  `vdireccion` varchar(100) NOT NULL,
  `nnumero` int NOT NULL,
  `vdepto` varchar(45) DEFAULT NULL,
  `vemail` varchar(150) NOT NULL,
  `vpassword` varchar(250) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (7,'Mariano Agustin','Mayo Santillan','1995-03-30','Libertad',267,'','marianoagustinmayo@gmail.com','$2b$10$wqzl8xhicjnekH95LdU3V.cG81petAGlzXC9j2vRXKlY9zkA3zh9u'),(8,'Mariano Prueba ','Mayo Santillan Prueba','1995-03-30','Libertad',267,'','marianopruebapostman@gmail.com','$2b$10$DBP9jBKfHz/MULYhhBevLevTFKNmh2WSGPfSdauYqUJLE6eRzlnZS'),(17,'Mariano desde register','Mayo santillan ','1995-03-30','dasdsa',1234,'','marianoagustinregistro@gmail.com','$2b$10$a8Ui03bq1/XQLs71REYqMuyhMK2v/vHPe3FxksQ5IqNEvpFE31WbS'),(18,'camila','costa','1995-03-30','Uriburu',448,'1','cammi.costa@gmail.com','$2b$10$3dCm4upaPvgx5MUbp5MLfu1K5McZIsAtItILfmeudo8E35D7Mu8g2'),(19,'nuevo registro','apellido registro','1990-09-30','ituzaingo',880,'','pepe@gmail.com','$2b$10$tkGykUowYfm6KWfTyj3pceGXEJ9jMHOYpRdC5XPzqQs7u/QB1dGDi'),(20,'Santiago','Bernabeu','1998-03-25','Suipacha',226,'','santiago@gmail.com','$2b$10$aXkRlHoE0tCMfW2pE914deFvtLUB7eA89IOf.8/0vyEwKv7R2x1Ia');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `idventa` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `tscreado` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ftotal` float NOT NULL,
  PRIMARY KEY (`idventa`),
  KEY `fk_venta_pedido_idx` (`id_pedido`),
  CONSTRAINT `fk_venta_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`idpedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venta_x_articulo`
--

DROP TABLE IF EXISTS `venta_x_articulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta_x_articulo` (
  `idventa_x_articulo` int NOT NULL AUTO_INCREMENT,
  `id_venta` int NOT NULL,
  `id_producto` int NOT NULL,
  `ncantidad` int NOT NULL,
  `fprecio` float NOT NULL,
  PRIMARY KEY (`idventa_x_articulo`),
  KEY `fk_idventaxarticulo_venta_idx` (`id_venta`),
  KEY `fk_idproducto_producto_idx` (`id_producto`),
  CONSTRAINT `fk_idproducto_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  CONSTRAINT `fk_idventaxarticulo_venta` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`idventa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta_x_articulo`
--

LOCK TABLES `venta_x_articulo` WRITE;
/*!40000 ALTER TABLE `venta_x_articulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta_x_articulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_comentarioxproducto`
--

DROP TABLE IF EXISTS `view_comentarioxproducto`;
/*!50001 DROP VIEW IF EXISTS `view_comentarioxproducto`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_comentarioxproducto` AS SELECT 
 1 AS `idcomentarioxproducto`,
 1 AS `id_producto`,
 1 AS `id_usuario`,
 1 AS `tcomentario`,
 1 AS `nrate`,
 1 AS `nombreproducto`,
 1 AS `vnombre`,
 1 AS `vapellido`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_favorito`
--

DROP TABLE IF EXISTS `view_favorito`;
/*!50001 DROP VIEW IF EXISTS `view_favorito`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_favorito` AS SELECT 
 1 AS `idfavorito`,
 1 AS `id_usuario`,
 1 AS `id_producto`,
 1 AS `vnombre`,
 1 AS `vfullname`,
 1 AS `tdescripcion`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_orden_compra_x_articulo`
--

DROP TABLE IF EXISTS `view_orden_compra_x_articulo`;
/*!50001 DROP VIEW IF EXISTS `view_orden_compra_x_articulo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_orden_compra_x_articulo` AS SELECT 
 1 AS `idorden_compra_x_producto`,
 1 AS `id_orden_compra`,
 1 AS `id_producto`,
 1 AS `ncantidad`,
 1 AS `id_usuario`,
 1 AS `vnombre`,
 1 AS `fprecio`,
 1 AS `vpath`,
 1 AS `tdescripcion`,
 1 AS `ncantidadproductosistema`,
 1 AS `bdisponible`,
 1 AS `fpreciooferta`,
 1 AS `ftotalprecio`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_pedido`
--

DROP TABLE IF EXISTS `view_pedido`;
/*!50001 DROP VIEW IF EXISTS `view_pedido`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_pedido` AS SELECT 
 1 AS `idpedido`,
 1 AS `id_orden_compra`,
 1 AS `ftotal`,
 1 AS `dfechapedido`,
 1 AS `bprocesado`,
 1 AS `benvio`,
 1 AS `id_usuario`,
 1 AS `vfullname`,
 1 AS `vemail`,
 1 AS `dfechaactualizado`,
 1 AS `bnotificado`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_producto`
--

DROP TABLE IF EXISTS `view_producto`;
/*!50001 DROP VIEW IF EXISTS `view_producto`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_producto` AS SELECT 
 1 AS `id_producto`,
 1 AS `vnombre`,
 1 AS `tdescripcion`,
 1 AS `fprecio`,
 1 AS `fpreciooferta`,
 1 AS `boferta`,
 1 AS `tsofertahasta`,
 1 AS `bofertavalida`,
 1 AS `dofertahasta`,
 1 AS `tscreado`,
 1 AS `dfechacreacion`,
 1 AS `nusuariocreador`,
 1 AS `vadministrador`,
 1 AS `idcategoria`,
 1 AS `vcategoria`,
 1 AS `id_marca`,
 1 AS `vmarca`,
 1 AS `vpath`,
 1 AS `ncantidad`,
 1 AS `bhabilitado`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'teachecommerce'
--

--
-- Dumping routines for database 'teachecommerce'
--
/*!50003 DROP FUNCTION IF EXISTS `formatear_apellido_nombre` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `formatear_apellido_nombre`(vapellido VARCHAR(255), vnombre VARCHAR(255)) RETURNS varchar(512) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    RETURN CONCAT(vnombre, ', ', vapellido);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `formatear_timestamp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `formatear_timestamp`(ts TIMESTAMP) RETURNS varchar(16) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE formatted_date VARCHAR(16);

    SET formatted_date = DATE_FORMAT(ts, '%d/%m/%Y %H:%i');

    RETURN formatted_date;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizarProductosDespuesDeProcesarPedido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarProductosDespuesDeProcesarPedido`(IN idOrdenCompra INT)
BEGIN
    DECLARE idProducto INT;
    DECLARE cantidadProducto INT;
    DECLARE done BOOLEAN DEFAULT FALSE;

    DECLARE cursorProductos CURSOR FOR
        SELECT id_producto, ncantidad
        FROM teachecommerce.orden_compra_x_producto
        WHERE id_orden_compra = idOrdenCompra;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cursorProductos;

    myLoop: LOOP
        FETCH cursorProductos INTO idProducto, cantidadProducto;
        IF done THEN
            LEAVE myLoop;
        END IF;

        UPDATE teachecommerce.producto
        SET ncantidad = ncantidad - cantidadProducto
        WHERE id_producto = idProducto;

         IF done THEN
            LEAVE myLoop;
        END IF;
    END LOOP;

    CLOSE cursorProductos;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_comentarioxproducto`
--

/*!50001 DROP VIEW IF EXISTS `view_comentarioxproducto`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_comentarioxproducto` AS select `c`.`idcomentarioxproducto` AS `idcomentarioxproducto`,`c`.`id_producto` AS `id_producto`,`c`.`id_usuario` AS `id_usuario`,`c`.`tcomentario` AS `tcomentario`,`c`.`nrate` AS `nrate`,`p`.`vnombre` AS `nombreproducto`,`u`.`vnombre` AS `vnombre`,`u`.`vapellido` AS `vapellido` from ((`comentarioxproducto` `c` join `producto` `p` on((`p`.`id_producto` = `c`.`id_producto`))) join `usuario` `u` on((`u`.`id_usuario` = `c`.`id_usuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_favorito`
--

/*!50001 DROP VIEW IF EXISTS `view_favorito`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_favorito` AS select `f`.`idfavorito` AS `idfavorito`,`f`.`id_usuario` AS `id_usuario`,`f`.`id_producto` AS `id_producto`,`p`.`vnombre` AS `vnombre`,`formatear_apellido_nombre`(`u`.`vapellido`,`u`.`vnombre`) AS `vfullname`,`p`.`tdescripcion` AS `tdescripcion` from ((`favorito` `f` join `producto` `p` on((`p`.`id_producto` = `f`.`id_producto`))) join `usuario` `u` on((`f`.`id_usuario` = `u`.`id_usuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_orden_compra_x_articulo`
--

/*!50001 DROP VIEW IF EXISTS `view_orden_compra_x_articulo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_orden_compra_x_articulo` AS select `ocxp`.`idorden_compra_x_producto` AS `idorden_compra_x_producto`,`ocxp`.`id_orden_compra` AS `id_orden_compra`,`ocxp`.`id_producto` AS `id_producto`,`ocxp`.`ncantidad` AS `ncantidad`,`oc`.`id_usuario` AS `id_usuario`,`p`.`vnombre` AS `vnombre`,`p`.`fprecio` AS `fprecio`,`p`.`vpath` AS `vpath`,`p`.`tdescripcion` AS `tdescripcion`,`p`.`ncantidad` AS `ncantidadproductosistema`,(`p`.`ncantidad` >= `ocxp`.`ncantidad`) AS `bdisponible`,round((case when ((`p`.`boferta` = 1) and (now() < `p`.`tsofertahasta`)) then (`p`.`fprecio` - (`p`.`fprecio` * 0.10)) else `p`.`fprecio` end),2) AS `fpreciooferta`,round(((case when ((`p`.`boferta` = 1) and (now() < `p`.`tsofertahasta`)) then (`p`.`fprecio` - (`p`.`fprecio` * 0.10)) else `p`.`fprecio` end) * `ocxp`.`ncantidad`),2) AS `ftotalprecio` from ((`orden_compra_x_producto` `ocxp` join `orden_compra` `oc` on((`ocxp`.`id_orden_compra` = `oc`.`idorden_compra`))) join `producto` `p` on((`ocxp`.`id_producto` = `p`.`id_producto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_pedido`
--

/*!50001 DROP VIEW IF EXISTS `view_pedido`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_pedido` AS select `p`.`idpedido` AS `idpedido`,`p`.`id_orden_compra` AS `id_orden_compra`,`p`.`ftotal` AS `ftotal`,`formatear_timestamp`(`p`.`tscreado`) AS `dfechapedido`,`p`.`bprocesado` AS `bprocesado`,`p`.`benvio` AS `benvio`,`oc`.`id_usuario` AS `id_usuario`,concat(`u`.`vapellido`,', ',`u`.`vnombre`) AS `vfullname`,`u`.`vemail` AS `vemail`,`formatear_timestamp`(`p`.`tsactualizado`) AS `dfechaactualizado`,`p`.`bnotificado` AS `bnotificado` from ((`pedido` `p` join `orden_compra` `oc` on((`oc`.`idorden_compra` = `p`.`id_orden_compra`))) join `usuario` `u` on((`oc`.`id_usuario` = `u`.`id_usuario`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_producto`
--

/*!50001 DROP VIEW IF EXISTS `view_producto`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_producto` AS select `p`.`id_producto` AS `id_producto`,`p`.`vnombre` AS `vnombre`,`p`.`tdescripcion` AS `tdescripcion`,`p`.`fprecio` AS `fprecio`,round((case when ((`p`.`boferta` = 1) and (now() < `p`.`tsofertahasta`)) then (`p`.`fprecio` - (`p`.`fprecio` * 0.10)) else `p`.`fprecio` end),2) AS `fpreciooferta`,`p`.`boferta` AS `boferta`,`p`.`tsofertahasta` AS `tsofertahasta`,(case when ((`p`.`boferta` = 1) and (now() < `p`.`tsofertahasta`)) then true else false end) AS `bofertavalida`,`formatear_timestamp`(`p`.`tsofertahasta`) AS `dofertahasta`,`p`.`tscreado` AS `tscreado`,`formatear_timestamp`(`p`.`tscreado`) AS `dfechacreacion`,`p`.`nusuariocreador` AS `nusuariocreador`,`formatear_apellido_nombre`(`a`.`vapellido`,`a`.`vnombre`) AS `vadministrador`,`c`.`idcategoria` AS `idcategoria`,`c`.`vcategoria` AS `vcategoria`,`p`.`id_marca` AS `id_marca`,`m`.`vmarca` AS `vmarca`,`p`.`vpath` AS `vpath`,`p`.`ncantidad` AS `ncantidad`,`p`.`bhabilitado` AS `bhabilitado` from (((`producto` `p` join `marca` `m` on((`p`.`id_marca` = `m`.`id_marca`))) join `categoria` `c` on((`c`.`idcategoria` = `p`.`id_categoria`))) join `administrador` `a` on((`p`.`nusuariocreador` = `a`.`id_administrador`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01 19:08:00

/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.1.44-community : Database - mydb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mydb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `mydb`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `shovel` int(100) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `user` */

insert  into `user`(`id`,`email`,`name`,`password`,`address`,`contact`,`shovel`) values (1,'mounishsoni116@gmail.com','Mounish Soni','1234','123 ASC','1234567890',1),(2,'abc@gmail.com','abc','1','123 ABC','1111111110',0),(3,'sdfsdf@gmail.com','ABC','`','123 ASC','1234567890',1),(4,'asdfg@gmail.com','Mounish Soni','1','123 ASC','12312',0),(5,'sdf@gmail.com','Mounish Soni','1','123 ASC','1234567890',0),(6,'parth@gmail.com','Parth Chauhan','1','123 ASC','11232',0),(7,'mounishs@gmail.com','Mounish Soni','1','123 ASC','11232',0),(8,'mounish6@gmail.com','sadf','1','123 ASC','1234567890',0),(9,'bobs@gmail.com','Bobo','1','123 asdfa','410852963451',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

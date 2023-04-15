-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: notesdb
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sessionID` int NOT NULL AUTO_INCREMENT,
  `sessionKey` varchar(128) NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `userID` int NOT NULL,
  PRIMARY KEY (`sessionID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'b2154e31-edaf-45cd-b301-d24230031d70',1,24),(2,'20a2b650-d57d-47a8-aeb0-3adfd8a7fe93',1,24),(3,'6b239cb9-3881-4491-a8af-4885e502dc23',1,24),(4,'508b5135-b98c-4346-b8f2-ac2583f017c8',1,24),(5,'c67fccb4-151d-4500-a1e4-a19c42af872e',0,24),(6,'e6d4c65f-54c6-4a8c-8872-1274ad51765c',1,24),(7,'aec7c6a9-d4c3-4517-b36d-43d993e084b5',1,24),(8,'8db0d11c-8d09-4c95-afd0-8115f5a04687',0,24),(9,'bc81e4e7-40fe-4825-b579-407de66d4a6f',1,24),(10,'ec7acc11-a56f-467a-9277-42afff76c0d3',1,24),(11,'f3679ff2-f949-4108-baad-5028333ff27c',1,24),(12,'d73f672e-e98e-4b33-82c4-6e289466d3be',1,24),(13,'973610c0-3c82-4377-a8bc-8d05246013ef',1,24),(14,'dee2f9f0-cc25-4397-a18a-0dd68c1a3a57',0,24),(15,'a9025712-ccb6-4be6-939d-99ea42338a22',1,24),(16,'164e9e50-8e24-4bf9-86b5-4ff163085c5f',1,24),(17,'1e7c30a2-3f35-4459-b7a9-a71f4b5373cb',0,28),(18,'e6c5b249-607e-45a3-97c1-445a08bdd31e',0,24),(19,'1b70f5f9-b59b-4861-9f1d-3291a1014339',0,24),(20,'e727d75d-e49e-4fca-9a1b-fd2b92ec8500',0,28),(21,'6e5a650f-becd-4ce8-9547-7777553c2af2',0,24),(22,'939038be-e935-4c47-82f2-68bd6c2cf95f',1,24),(23,'e75c7ea5-4ea0-4382-b6c3-d0ef4ac8f7c4',1,24);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-15 16:05:20
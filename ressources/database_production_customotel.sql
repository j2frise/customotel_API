-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: database_development_customotel
-- ------------------------------------------------------
-- Server version	5.7.31
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,POSTGRESQL' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table "banks"
--

DROP TABLE IF EXISTS "banks";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "banks" (
  "id" int(11) NOT NULL,
  "hostelId" int(11) NOT NULL,
  "name_bank" varchar(255) NOT NULL,
  "name_customer" varchar(255) NOT NULL,
  "bic" varchar(255) NOT NULL,
  "iban" varchar(255) NOT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id"),
  KEY "hostelId" ("hostelId"),
  CONSTRAINT "banks_ibfk_1" FOREIGN KEY ("hostelId") REFERENCES "hostels" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "banks"
--

LOCK TABLES "banks" WRITE;
/*!40000 ALTER TABLE "banks" DISABLE KEYS */;
/*!40000 ALTER TABLE "banks" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "customers"
--

DROP TABLE IF EXISTS "customers";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "customers" (
  "id" int(11) NOT NULL,
  "userHostelId" int(11) NOT NULL,
  "fullname" varchar(255) NOT NULL,
  "pseudo" varchar(255) DEFAULT NULL,
  "avatar" varchar(255) NOT NULL,
  "desc" text,
  "sexe" varchar(255) NOT NULL,
  "uniqid" varchar(255) DEFAULT NULL,
  "phone" varchar(255) NOT NULL,
  "email" varchar(255) DEFAULT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id"),
  KEY "user_hostelId" ("userHostelId"),
  CONSTRAINT "customers_ibfk_1" FOREIGN KEY ("userHostelId") REFERENCES "user_hostels" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "customers"
--

LOCK TABLES "customers" WRITE;
/*!40000 ALTER TABLE "customers" DISABLE KEYS */;
INSERT INTO "customers" VALUES (3,1,'oliwia Ch�ne',NULL,'/assets/img/default.png',NULL,'F','CD626C68','+33751932695','oliwia.chene@hetic.net',NULL,'2021-04-21 11:23:48','2021-04-21 11:23:48');
/*!40000 ALTER TABLE "customers" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "hostels"
--

DROP TABLE IF EXISTS "hostels";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "hostels" (
  "id" int(11) NOT NULL,
  "app_id" varchar(255) DEFAULT NULL,
  "name" varchar(255) NOT NULL,
  "shortname" varchar(255) NOT NULL,
  "logo" varchar(255) NOT NULL,
  "token" text,
  "address" text NOT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "hostels"
--

LOCK TABLES "hostels" WRITE;
/*!40000 ALTER TABLE "hostels" DISABLE KEYS */;
INSERT INTO "hostels" VALUES (1,'ornela-9c24d276c7a52291deb1','ornela','ornela','/assets/img/default.png','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0ZWxJZCI6MSwiYXBpS2V5Ijoib3JuZWxhLTljMjRkMjc2YzdhNTIyOTFkZWIxIiwiaWF0IjoxNjE4OTY2MDY4LCJleHAiOjE2NTA1MDIwNjh9.bKNPQF57HoGJwmbVCBPMhkLDRl1StXphnMoesIFDFBs','3 rue de paris, 92200 Neuilly-sur-seine',NULL,'2021-04-20 22:55:55','2021-04-21 00:47:48');
/*!40000 ALTER TABLE "hostels" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "memberships"
--

DROP TABLE IF EXISTS "memberships";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "memberships" (
  "id" int(11) NOT NULL,
  "subscriptionId" int(11) NOT NULL,
  "hostelId" int(11) NOT NULL,
  "expired" datetime NOT NULL,
  "nb_account" int(11) NOT NULL,
  "changed" datetime DEFAULT NULL,
  "is_expired" tinyint(1) NOT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id"),
  KEY "subscriptionId" ("subscriptionId"),
  KEY "hostelId" ("hostelId"),
  CONSTRAINT "memberships_ibfk_1" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions" ("id"),
  CONSTRAINT "memberships_ibfk_2" FOREIGN KEY ("hostelId") REFERENCES "hostels" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "memberships"
--

LOCK TABLES "memberships" WRITE;
/*!40000 ALTER TABLE "memberships" DISABLE KEYS */;
INSERT INTO "memberships" VALUES (1,2,1,'2021-05-20 22:55:55',0,NULL,0,'2021-04-20 22:55:55','2021-04-20 22:55:55');
/*!40000 ALTER TABLE "memberships" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "rates"
--

DROP TABLE IF EXISTS "rates";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "rates" (
  "id" int(11) NOT NULL,
  "userHostelId" int(11) NOT NULL,
  "customerId" int(11) NOT NULL,
  "rating" int(11) NOT NULL,
  "comment" text,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id"),
  KEY "user_hostelId" ("userHostelId"),
  KEY "customerId" ("customerId"),
  CONSTRAINT "rates_ibfk_1" FOREIGN KEY ("userHostelId") REFERENCES "user_hostels" ("id"),
  CONSTRAINT "rates_ibfk_2" FOREIGN KEY ("customerId") REFERENCES "customers" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "rates"
--

LOCK TABLES "rates" WRITE;
/*!40000 ALTER TABLE "rates" DISABLE KEYS */;
INSERT INTO "rates" VALUES (2,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:26:45','2021-04-21 13:26:45'),(3,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:28:44','2021-04-21 13:28:44'),(4,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:32:45','2021-04-21 13:32:45'),(5,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:36:20','2021-04-21 13:36:20'),(6,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:41:23','2021-04-21 13:41:23'),(7,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:48:29','2021-04-21 13:48:29'),(8,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:53:09','2021-04-21 13:53:09'),(9,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:55:11','2021-04-21 13:55:11'),(10,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:56:28','2021-04-21 13:56:28'),(11,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 13:56:57','2021-04-21 13:56:57'),(12,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 14:06:55','2021-04-21 14:06:55'),(13,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 14:07:43','2021-04-21 14:07:43'),(14,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 14:08:16','2021-04-21 14:08:16'),(15,1,3,9,'Elle est tr�s sage et a m�me nettoy� la chambre',NULL,'2021-04-21 14:09:03','2021-04-21 14:09:03');
/*!40000 ALTER TABLE "rates" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "sequelizemeta"
--

DROP TABLE IF EXISTS "sequelizemeta";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "sequelizemeta" (
  "name" varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY ("name"),
  UNIQUE KEY "name" ("name")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "sequelizemeta"
--

LOCK TABLES "sequelizemeta" WRITE;
/*!40000 ALTER TABLE "sequelizemeta" DISABLE KEYS */;
INSERT INTO "sequelizemeta" VALUES ('20210406000956-create-hostels.js'),('20210406001358-create-users.js'),('20210406001632-create-banks.js'),('20210406001905-create-subscriptions.js'),('20210406002205-create-memberships.js'),('20210406002726-create-user-hostels.js'),('20210406002821-create-customers.js'),('20210407021402-create-rates.js');
/*!40000 ALTER TABLE "sequelizemeta" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "subscriptions"
--

DROP TABLE IF EXISTS "subscriptions";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "subscriptions" (
  "id" int(11) NOT NULL,
  "name" varchar(255) NOT NULL,
  "resume" varchar(255) NOT NULL,
  "nb_account" int(11) DEFAULT NULL,
  "price" int(11) NOT NULL,
  "logo" varchar(255) NOT NULL,
  "duration" int(11) NOT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "subscriptions"
--

LOCK TABLES "subscriptions" WRITE;
/*!40000 ALTER TABLE "subscriptions" DISABLE KEYS */;
INSERT INTO "subscriptions" VALUES (1,'Gold','Un tout en un',50,100,'https://i.ibb.co/D7T7d0W/gold.png',1,NULL,'2021-04-06 04:01:45','2021-04-06 04:01:45'),(2,'Silver','Les meilleurs r�sultats',15,39,'https://i.ibb.co/Gd4yxbZ/silver.png',1,NULL,'2021-04-06 04:01:45','2021-04-06 04:01:45'),(3,'Basic','Pack starter',0,10,'https://i.ibb.co/CzvgyK5/basic.png',1,NULL,'2021-04-06 04:03:37','2021-04-06 04:03:37');
/*!40000 ALTER TABLE "subscriptions" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "user_hostels"
--

DROP TABLE IF EXISTS "user_hostels";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "user_hostels" (
  "id" int(11) NOT NULL,
  "userId" int(11) NOT NULL,
  "hostelId" int(11) NOT NULL,
  "password" varchar(255) NOT NULL,
  "role" varchar(255) NOT NULL,
  "is_admin" tinyint(1) NOT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id"),
  KEY "userId" ("userId"),
  KEY "hostelId" ("hostelId"),
  CONSTRAINT "user_hostels_ibfk_1" FOREIGN KEY ("userId") REFERENCES "users" ("id"),
  CONSTRAINT "user_hostels_ibfk_2" FOREIGN KEY ("hostelId") REFERENCES "hostels" ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "user_hostels"
--

LOCK TABLES "user_hostels" WRITE;
/*!40000 ALTER TABLE "user_hostels" DISABLE KEYS */;
INSERT INTO "user_hostels" VALUES (1,1,1,'$2a$05$E6YIq2oDV/zTtlURSShCTOYwizKjhLSFtJK4DDgNL7GhC93tS/ZJ.','G�rant',1,NULL,'2021-04-20 22:55:55','2021-04-20 22:55:55');
/*!40000 ALTER TABLE "user_hostels" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "users"
--

DROP TABLE IF EXISTS "users";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE "users" (
  "id" int(11) NOT NULL,
  "firstname" varchar(255) DEFAULT NULL,
  "lastname" varchar(255) DEFAULT NULL,
  "email" varchar(255) NOT NULL,
  "isActived" tinyint(1) NOT NULL,
  "deletedAt" datetime DEFAULT NULL,
  "createdAt" datetime NOT NULL,
  "updatedAt" datetime NOT NULL,
  PRIMARY KEY ("id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "users"
--

LOCK TABLES "users" WRITE;
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
INSERT INTO "users" VALUES (1,NULL,NULL,'jarce2frise@gmail.com',1,NULL,'2021-04-20 22:52:17','2021-04-20 22:54:29'),(2,NULL,NULL,'romain.danizel@hetic.net',0,NULL,'2021-04-21 11:43:20','2021-04-21 11:43:20');
/*!40000 ALTER TABLE "users" ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-22  2:21:27

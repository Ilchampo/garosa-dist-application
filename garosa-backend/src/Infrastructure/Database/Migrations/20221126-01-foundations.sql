-- Script: 20221126-01-foundations.sql
-- Created by: Pablo Beltran
-- Description: Create the tables of the database

-- garosa_dist_dev.`user` definition

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier for user',
  `firstName` varchar(100) NOT NULL COMMENT 'Firstname of the user',
  `lastName` varchar(100) NOT NULL COMMENT 'Lastname of the user',
  `email` varchar(200) NOT NULL COMMENT 'Email of the user',
  `password` varchar(500) NOT NULL COMMENT 'Password of the user',
  `hash` varchar(10) NOT NULL COMMENT 'Hast to encrypt and decrypt user password',
  `createdOn` datetime NOT NULL COMMENT 'Stores the date when the user was created',
  `updatedOn` datetime NOT NULL COMMENT 'Stores date when the user was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Stores if the user is deleted from the system',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email_UN` (`email`),
  UNIQUE KEY `user_hash_UN` (`hash`),
  KEY `user_email_IDX` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store registered users on the system';


-- garosa_dist_dev.application_configuration definition

CREATE TABLE IF NOT EXISTS `application_configuration` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Stored the unique identier of the application configuration',
  `language` varchar(100) NOT NULL COMMENT 'Stores the application default language',
  `maxRadius` decimal(10,0) NOT NULL COMMENT 'Stores the maximum radius from the distribution point to enable create a report',
  `maxPointsPerRoute` int(11) NOT NULL COMMENT 'Stores the maximum number of distribution points to be visited per route',
  `updatedOn` datetime NOT NULL COMMENT 'Stores the date when the configuration was last updated',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the global configuration of the system';


-- garosa_dist_dev.`role` definition

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Stores the unique identifier of the role',
  `roleName` varchar(100) NOT NULL COMMENT 'Stores the role name',
  `roleDescription` varchar(200) NOT NULL COMMENT 'Stores the role description',
  `createdOn` datetime NOT NULL COMMENT 'Stores the date when the role was created',
  `updatedOn` datetime NOT NULL COMMENT 'Stores the date when the role was last updated',
  `deleted` tinyint(1) NOT NULL COMMENT 'Stores if the role has been deleted',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the roles of the system';


-- garosa_dist_dev.log definition

CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Stores the unique identifier of the log',
  `userId` int(11) NOT NULL COMMENT 'Stores the unique identifier of the user who created the log',
  `logName` varchar(100) NOT NULL COMMENT 'Stores the name of the log',
  `logDescription` varchar(100) NOT NULL COMMENT 'Stores the description of the log',
  `logStatus` int(11) NOT NULL COMMENT 'Stores the status of the log',
  `createdOn` datetime NOT NULL COMMENT 'Stores the date when the log was created',
  PRIMARY KEY (`id`),
  KEY `log_FK` (`userId`),
  CONSTRAINT `log_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store logs created on the system';


-- garosa_dist_dev.role_permission definition

CREATE TABLE IF NOT EXISTS `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Stores the unique identifier of the role permission',
  `roleId` int(11) NOT NULL COMMENT 'Stores the role unique identifier',
  `permissionName` varchar(100) NOT NULL COMMENT 'Stores the role permission name',
  `permissionDefault` tinyint(1) NOT NULL COMMENT 'Stores the role permission default',
  `createdOn` datetime NOT NULL COMMENT 'Stores when the role permission was created',
  `updatedOn` datetime NOT NULL COMMENT 'Stores when the role permission was last updated on',
  `deleted` tinyint(1) NOT NULL COMMENT 'Stores if the role permission has been deleted',
  PRIMARY KEY (`id`),
  KEY `role_permission_FK` (`roleId`),
  CONSTRAINT `role_permission_FK` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to store the role permissions of the system';


-- garosa_dist_dev.user_access definition

CREATE TABLE IF NOT EXISTS `user_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Stores the unique identifier of the user access',
  `userId` int(11) NOT NULL COMMENT 'Stores the unique identifier of the user',
  `roleId` int(11) NOT NULL COMMENT 'Stores the unique identifier of the role',
  `createdOn` datetime NOT NULL COMMENT 'Stores the date when the user access was created',
  `updatedOn` datetime NOT NULL COMMENT 'Stores the date when the user access was last updated on',
  `deleted` tinyint(1) NOT NULL COMMENT 'Stores if the user access has been deleted',
  PRIMARY KEY (`id`),
  KEY `user_access_FK` (`userId`),
  KEY `user_access_FK_1` (`roleId`),
  CONSTRAINT `user_access_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`),
  CONSTRAINT `user_access_FK_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Table to the user access of a user registered on the system';
-- Script: 20221126-02-configuration.sql
-- Created by: Pablo Beltran
-- Description: Insert default application configuration

INSERT IGNORE INTO application_configuration (id, language, maxRadius, maxPointsPerRoute, updatedOn) 
VALUES(1, 'en', 100.00, 20, NOW());
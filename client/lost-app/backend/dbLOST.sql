-- ===================================================================
-- dbLost.sql
--   This script builds the dbTickets database and its table.  It also 
-- inserts data into the tables.
-- ===================================================================

-- -------------------------------------------------------------------
-- Save selected MySQL settings
-- -------------------------------------------------------------------
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -------------------------------------------------------------------
-- Delete and create database
-- -------------------------------------------------------------------
DROP SCHEMA IF EXISTS `dbLost` ;
CREATE SCHEMA IF NOT EXISTS `dbLost` DEFAULT CHARACTER SET utf8;
USE dbLost;

DROP TABLE IF EXISTS `dbLost`.`tbSongs` ;
CREATE TABLE IF NOT EXISTS `dbLost`.`tbSongs` (
  `songName` VARCHAR(255) NOT NULL,
  `artistName` VARCHAR(255) NOT NULL,
  `userEmail` VARCHAR(255) NOT NULL,
  `songLoudness` VARCHAR(255) NOT NULL,
  `songMood` VARCHAR(255) NOT NULL,
  `songLocation` VARCHAR(255) NOT NULL,
  `songActivity` INT(255) NOT NULL,
  PRIMARY KEY (`songName`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `dbLost`.`tbUsers` ;
CREATE TABLE IF NOT EXISTS `dbLost`.`tbUsers` (
  `userID` INT(255) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `userEmail` VARCHAR(255) NOT NULL,
  `topSong1` VARCHAR(255) NOT NULL,
  `topSong2` VARCHAR(255) NOT NULL,
  `topSong3` VARCHAR(255) NOT NULL,
  `topSong4` VARCHAR(255) NOT NULL,
  `topSong5` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userID`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `dbLost`.`tbArtists` ;
CREATE TABLE IF NOT EXISTS `dbLost`.`tbArtists` (
  `artistID` INT(255) NOT NULL AUTO_INCREMENT,
  `artistName` VARCHAR(255) NOT NULL,
  `genres` VARCHAR(255) NOT NULL, 
  PRIMARY KEY (`artistID`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `dbLost`.`tbLikedSongs` ;
CREATE TABLE IF NOT EXISTS `dbLost`.`tbLikedSongs` (
	`likedSongsID` INT(255) NOT NULL, 
    `songName` VARCHAR(255) NOT NULL, 
    `attribute1` INT(255) NOT NULL, 
    `attribute2` INT(255) NOT NULL, 
    `attribute3` INT(255) NOT NULL, 
    PRIMARY KEY (`likedSongsID`),
	FOREIGN KEY (`songName`) references tbSongs (`songName`))
    ENGINE = InnoDB; 
    
    Select * from tbLikedSongs; 

-- -----------------------------------------------------
-- Restore saved MySQL settings
-- -----------------------------------------------------
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

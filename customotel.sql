-- MySQL Script generated by MySQL Workbench
-- Tue Apr  6 02:25:55 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`hostels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`hostels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `app_id` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `logo` VARCHAR(45) NULL,
  `deletedAt` DATETIME NULL,
  `app_secret` VARCHAR(45) NOT NULL,
  `address` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`banks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`banks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_bank` VARCHAR(45) NULL,
  `name_customer` VARCHAR(45) NULL,
  `bic` VARCHAR(45) NULL,
  `iban` VARCHAR(45) NULL,
  `deletedAt` DATETIME NULL,
  `hostel_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bank_hostel_idx` (`hostel_id` ASC) VISIBLE,
  CONSTRAINT `fk_bank_hostel`
    FOREIGN KEY (`hostel_id`)
    REFERENCES `mydb`.`hostels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fistname` VARCHAR(45) NULL,
  `lastename` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role` VARCHAR(45) NULL,
  `is_admin` TINYINT NOT NULL,
  `deletedAt` DATETIME NULL,
  `hostels_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_hostels1_idx` (`hostels_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_hostels1`
    FOREIGN KEY (`hostels_id`)
    REFERENCES `mydb`.`hostels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`customers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `fullname` VARCHAR(45) NOT NULL,
  `pseudo` VARCHAR(45) NULL,
  `avatar` VARCHAR(45) NOT NULL,
  `desc` TEXT NULL,
  `sexe` CHAR(1) NOT NULL,
  `uniqid` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_customer_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_customer_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`rates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`rates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NOT NULL,
  `comment` TEXT NULL,
  `users_id` INT NOT NULL,
  `customers_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rates_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_rates_customers1_idx` (`customers_id` ASC) VISIBLE,
  CONSTRAINT `fk_rates_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rates_customers1`
    FOREIGN KEY (`customers_id`)
    REFERENCES `mydb`.`customers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`subscriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`subscriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `deletedAt` DATETIME NULL,
  `nb_account` INT NULL,
  `price` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`memberships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`memberships` (
  `id` INT NOT NULL,
  `duration` INT NOT NULL,
  `expired` DATETIME NULL,
  `changed` DATETIME NULL,
  `subscriptions_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_memberships_subscriptions1_idx` (`subscriptions_id` ASC) VISIBLE,
  INDEX `fk_memberships_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_memberships_subscriptions1`
    FOREIGN KEY (`subscriptions_id`)
    REFERENCES `mydb`.`subscriptions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_memberships_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

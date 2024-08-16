SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS GasStationFinder;
USE GasStationFinder;

CREATE TABLE Region (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE District (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region_id INT,
    FOREIGN KEY (region_id) REFERENCES Region(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL
);


CREATE TABLE GasStation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region_id INT,
    district_id INT,
    location_id INT,
    address VARCHAR(255),
    open_hours VARCHAR(255),
    FOREIGN KEY (region_id) REFERENCES Region(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (district_id) REFERENCES District(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (location_id) REFERENCES Location(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);


CREATE TABLE FuelType (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);


CREATE TABLE GasPrice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gas_station_id INT,
    fuel_type_id INT,
    price_per_liter DECIMAL(10, 2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gas_station_id) REFERENCES GasStation(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (fuel_type_id) REFERENCES FuelType(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

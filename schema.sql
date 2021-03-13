DROP DATABASE IF EXISTS purchase_list;

CREATE DATABASE purchase_list;

USE purchase_list;

CREATE TABLE items (
  id int NOT NULL AUTO_INCREMENT,
  item varchar(50) NOT NULL,
  price DECIMAL(7,3) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  firstname varchar(50) NOT NULL,
  lastname varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE purchase_history (
  id int NOT NULL AUTO_INCREMENT,
  user_id int,
  item_id int,
  qte DECIMAL(7,3) NOT NULL,
  l_price DECIMAL(7,3) NOT NULL,
  date DATETIME  DEFAULT  CURRENT_TIMESTAMP,
  PRIMARY KEY (ID),
  FOREIGN KEY (item_id) REFERENCES items(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

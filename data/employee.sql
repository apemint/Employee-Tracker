
DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;


CREATE TABLE department (

  id INT NOT NULL AUTO_INCREMENT,

  name VARCHAR(30),
);


CREATE TABLE role (

  id INT NOT NULL AUTO_INCREMENT,

  title VARCHAR(30),

  salary DECIMAL,

  department_id INTEGER
);



CREATE TABLE employee (

  id INT NOT NULL AUTO_INCREMENT,

  first_name VARCHAR(30),

  last_name VARCHAR(30),

  role_id INT
);




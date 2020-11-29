
DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;


CREATE TABLE department (

  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY(department_id)
);


CREATE TABLE role (

  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY(role_id)
);



CREATE TABLE employee (

  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


--Department Seeds--
INSERT INTO department (name) VALUE ("Clothing");
INSERT INTO department (name) VALUE ("Computers");
INSERT INTO department (name) VALUE ("Home");
INSERT INTO department (name) VALUE ("Books");
INSERT INTO department (name) VALUE ("Sports");
INSERT INTO department (name) VALUE ("Music");

--Role Seeds--
INSERT INTO role (title, salary, department_id) VALUE ("Manager", 30000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Stocker", 15000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Cashier", 15000, 3);

--Employee Seeds--
INSERT INTO employee ( last_name, first_name, role_id) VALUE ("Andreyevich", "Alphonso", 3);
INSERT INTO employee ( last_name, first_name, role_id) VALUE ("Lermontov", "Michael", 1);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Onegin", "Eugene", 1);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Pushkin", "Alexander", 2);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Mayakovski", "Vladimir", 2);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Spiegel", "Spike", 2);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Black", "Jet", 3);
INSERT INTO employee (last_name, first_name, role_id) VALUE ("Valentine", "Faye", 3);


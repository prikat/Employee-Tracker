INSERT INTO department(name) 
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles(title, salary, dept_id)
VALUES ('Sales Lead', '100000', 1),
       ('Salesperson', '80000', 1),
       ('Lead Engineer', '150000', 2),
       ('Software Engineer', '120000', 2),
       ('Accountant', '125000', 3),
       ('Legal Team Lead', '250000', 4),
       ('Lawyer', '190000', 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) 
VALUES ('Alex', 'Pry', 1, 3), 
       ('Sean', 'Rooney', 2, 1),
       ('Akshay', 'Sharma', 3, NULL),
       ('Chris', 'Tumbokon', 4, 3),
        ('Maria', 'Malik', 5, NULL),
        ('Cass', 'Wrackley', 6, NULL),
        ('Tom', 'Ford',7, 6);
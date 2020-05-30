const inquirer = require('inquirer');
const mysql = require('mysql');

// Queries 

var queryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, " ", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id';
var deptQueryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, "", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id ORDER BY dept_id';
var manQueryString = 'SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name,roles.title AS title, roles.salary AS salary, department.name AS department,CONCAT(e.first_name, "", e.last_name) AS Manager FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.dept_id=department.id LEFT JOIN employee e ON employee.manager_id=e.id WHERE employee.manager_id IS NOT NULL';

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'employee_managment_db'
});

promptUser();

// Prompt an user for information 

function promptUser() {
     inquirer.prompt(
        {
            type: 'list',
            name: 'test',
            message: 'What would you like to do?',
            choices : ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'End']
        })
        .then(function(answers)
        {
           if(answers.test === 'View All Employees') {
               viewAllEmp();
           }
           else if(answers.test === 'View All Employees by Department') {
               viewAllEmpByDep();
           }
           else if(answers.test === 'View All Employees by Manager') {
               viewAllEmpByMan();
           }
           else if(answers.test === 'Add Employee') {
               addEmployee();
           }
           else if(answers.test === 'Remove Employee') {
               removeEmployee();
           }
           else if(answers.test === 'Update Employee Role') {
               updateEmployeeRole();
           }
           else if(answers.test === 'Update Employee Manager') {
               updateEmployeeManager();
           }
           else if(answers.test === 'End') {
               connection.end();
           }
        })
}

// All Employee Database

function viewAllEmp() {
    connection.query(
        queryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                console.table(rows);

            console.log('Woah!! After all I can view all employees data');
            console.log("\n");
         
            promptUser();
        }
    );
}

// All Employee By Department

function viewAllEmpByDep() {
    connection.query(
        deptQueryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                console.table(rows);

            console.log('Woah!! After all I can view all employees data by department');
            console.log("\n");
            
            promptUser();
        }
    );
}

// All Employee By Manager

function viewAllEmpByMan() {
    connection.query(
        manQueryString, function(err, rows, fields) {
            if(err) throw err;

                console.clear();
                console.table(rows);

            console.log('Woah!! After all I can view all employees data by manager');
            console.log("\n");
            
            promptUser();
        }
    );
}

// Add Employee

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee last name'   
        },
        {
            type: 'list',
            name: 'title',
            message: 'What is the employee role?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
        {
            type: 'list',
            name: 'department',
            message: 'What is the employee department',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'What is the managers id',
            choices: ['Alex Pry', 'Sean Rooney', 'Akshay Sharma', 'Chris Tumbokon', 'Maria Malik', 'Cass Wrackley', 'Tom Ford']
        }
    ])
    .then(function(answer) {

        let managerID, departmentID, titleID;

        if(answer.department === 'Sales') {
            departmentID = '1';
        }
        else if(answer.department === 'Engineering') {
            departmentID = '2';
        }
        else if(answer.department === 'Finance') {
            departmentID = '3';
        }
        else if(answer.department === 'Legal') {
            departmentID = '4';
        }

        if(answer.manager === 'Alex Pry' ) {
            managerID = '1';
        }
        else if(answer.manager === 'Sean Rooney' ) {
            managerID = '2';
        }
        else if(answer.manager === 'Akshay Sharma' ) {
            managerID = '3';
        }
        else if(answer.manager === 'Chris Tumbokon' ) {
            managerID = '4';
        }
        else if(answer.manager === 'Maria Malik' ) {
            managerID = '5';
        }
        else if(answer.manager === 'Cass Wrackley' ) { 
            managerID = '6';
        }
        else if(answer.manager === 'Tom Ford') {
            managerID = '7';
        }

        if(answer.title === 'Sales Lead' ) {
                titleID = '1';
        }
        else if(answer.title === 'Salesperson' ) {
                titleID = '2';
        }
        else if(answer.title === 'Lead Engineer' ) {
                titleID = '3';
        }
        else if(answer.title === 'Software Engineer' ) {
                titleID = '4';
        }
        else if(answer.title === 'Accountant' ) {
                titleID = '5';
        }
        else if(answer.title === 'Legal Team Lead' ) { 
                titleID = '6';
        }
        else if(answer.title === 'Lawyer') {
                titleID = '7';
        }

        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: titleID,
                manager_id: managerID
            },
            function(err, result) {
            if(err) throw err;

        });

        connection.query(
            "INSERT INTO roles SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                dept_id: departmentID
            },
            function(err, result) {
            if(err) throw err;
            
        });

        console.log('Now you can view the table along with an added employee');
 
        viewAllEmp();
        });
    }

    // Remove employee 

function removeEmployee() {
    connection.query(
            "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS fullname FROM employee", function(err, rows) {
                if(err) throw err;
                
                inquirer.prompt({
                        name: 'choice',
                        type: 'list',
                        choices: function() {
                            let option = [];
                            for(let i=0; i < rows.length; i++) {
                                option.push(rows[i].fullname);
                            }
                            return option;
                        },
                        message: "Delete the chosen employee"
                    })
                .then(function(answer){
                    let firstName = answer.choice.split(" ")[0];
                    
                    connection.query("DELETE FROM employee WHERE first_name = ?", [firstName],
                             function(err, result){
                                 if(err) throw err;

                                 console.clear();
                                 console.table(result);

                console.log('Woah!! Deleted the chosen employee from the database');
                console.log("\n");
                console.log("Now, Removed an employee from the database");
                viewAllEmp();
            });
    });
})
 }



 function updateEmployeeRole() {
    connection.query(
                "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS fullname, roles.title AS title FROM employee JOIN roles ON employee.role_id = roles.id", function(err, rows) {
                    if(err) throw err;

                    inquirer.prompt([{
                        name: 'choice',
                        type: 'list',
                        choices: function() {
                            let option = [];
                            for(let i=0; i < rows.length; i++) {
                                option.push(rows[i].fullname);
                            }
                            return option;
                        },
                        message: "Display all roles"
                    },
                    {
                        name: 'role',
                        type: 'list',
                        choices: function() {
                            let option1 = [];
                            for(let j=0; j < rows.length; j++) {
                                option1.push(rows[j].title);
                            }
                            return option1;
                        },
                        message: "update the chosen role for the chosen person"
                    }]
                    )
                .then(function(answer){
                    let firstName = answer.choice.split(" ")[0];
                    let roleID = answer.role;
                    let chosenItem;

                    console.log(firstName);
                    console.log(roleID);

                    for(let i=1; i <= answer.length; i++) {
                        if(answer[i].fullname === answer.choice) {
                            chosenItem = i;
                            console.log(chosenItem);
                        }
                    }

                    connection.query("UPDATE roles SET ? WHERE ?", 
                    [
                        {
                            title: roleID
                        },
                        {
                            id: chosenItem
                        }
                    ],    
                    function(err, result) {
                        if(err) throw err;
                        console.log(result.affectedRows);
                        console.clear();
                        console.table(result);

               
                promptUser();
                });
                });
            })
        }






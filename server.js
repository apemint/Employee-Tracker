//=================================================
//------------DEPENDENCIES-------------------------
//=================================================

const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");

//=================================================
//--------CONNECTION TO DB-------------------------
//=================================================
const connection = mysql.createConnection({
    host: "localhost",
    //port#
    port: 3306,
    //username
    user: "root",
    //pw
    password: "password",
    database: "employeeTracker_db"
});

//=================================================
//--------------CONNECTION-------------------------
//=================================================
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    //***add function to start prompt here***
    start();
});

//=================================================
//----------Add FUNCTIONS-------------------------
//=================================================

//==========Add Department
function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: 'input',
            message: 'Name of department being added?'
        }
    ]).then(function (res) {
        connection.query("INSERT INTO department SET ? ",
            {
                department_name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                start();
            })
    })
}

//==========Add Role
function addRole() {

    inquirer.prompt([
        {
            name: "Role",
            type: "input",
            message: "Name of Role being added?"
        },
        {
            name: "Salary",
            type: "input",
            message: "Salary for new Role?"
        },
        {
            name: "Department",
            type: "list",
            message: "Add role to which department?",
            choices: listDepartments()
        }
    ]).then(function (res) {
        let departmentId = listDepartments().indexOf(res.Department) + 1;
        connection.query(
            "INSERT INTO role SET ?", ///how to take department name and get id from dep table and insert into role table
            {
                title: res.Role,
                salary: res.Salary,
                department_id: departmentId,
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                start();
            }
        )
    })

}

//function to list updated departments to choose ffrom
let departments = [];
function listDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].department_name);
        }
    })
    return departments;
}
//==========Add Employee
//inquirer to ask for input then push to db
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: 'input',
            message: "Enter first name"
        },
        {
            name: "lastname",
            type: 'input',
            message: 'Enter last name'
        },
        {
            name: 'role',
            type: "list",
            message: 'Enter role',
            choices: listRoles(), //how to populate with roles list
        }
    ]).then(function (answer) { /////check if this works
        let roleId = listRoles().indexOf(answer.role) + 1 //+1 because index starts at 0 but role ids start at 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: roleId

            }, function (err) {
                if (err) throw err;
                console.table(answer);
                start();
            })
    })
};


//=================================================
//----------VIEW FUNCTIONS-------------------------
//=================================================

//======== VIEW DEPARTMENTS
function viewDepartments() {
    console.log("Viewing by Department...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

//========= VIEW ROLES
function viewRoles() {
    console.log("Viewing by role...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res); //console.table(res)?
        start();
    })
};

//========= VIEW EMPLOYEES
function viewEmployees() {
    console.log("Viewing all employees...\n");
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.department_name, employee.role_id FROM employee JOIN role ON employee.role_id = role.role_id JOIN department ON role.department_id = department.department_id ORDER BY employee.id;", function (err, res) {
        if (err) throw err;
        console.table(res); //console.table(res) here?
        start();
    })
};

//=================================================
//---------UPDATE EMPLOYEE-------------------------
//=================================================



function updateRoles() {
    connection.query("SELECT last_name, first_name, employee.role_id FROM employee JOIN role on employee.role_id = role.role_id", function (err, res) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "lastName",
                type: "list",
                message: "Employee last name",
                choices: function () {
                    let lastName = [];
                    for (var i = 0; i < res.length; i++) {
                        lastName.push(res[i].last_name);
                    }
                    return lastName;
                },
            },
            {
                name: "role",
                type: "list",
                message: "Employee's new Role",
                choices: listRoles()
            }
        ]).then(function (answer) {
            let roleId = listRoles().indexOf(answer.role) + 1
            connection.query("UPDATE employee SET ? WHERE  ?",
                [
                   
                    {
                        role_id: roleId,
                    },
                     {
                        last_name: answer.lastName,
                    },
                ],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
        })
    })
}

//function to get updated roles from db to display to choose in prompts.
let roles = [];
function listRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            roles.push(res[i].title);
        }

    })
    return roles;
}

//=================================================
//------INQUIRER---PROMPTS-------------------------
//=================================================

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "Add a Department",
                "Add a Role",
                "Add an Employee",
                "View departments",
                "View Roles",
                "View Employees",
                "Update Employee Roles"
            ]
        }
    ]).then(function (answer) {
        //using switch case here, if case matches, run that code then break, stopping code from checking against other cases
        switch (answer.choice) {
            case "Add a Department": addDepartment();
                break;
            case "Add a Role": addRole();
                break;
            case "Add an Employee": addEmployee();
                break;
            case "View departments": viewDepartments();
                break;
            case "View Roles": viewRoles();
                break;
            case "View Employees": viewEmployees();
                break;
            case "Update Employee Roles": updateRoles();
        };
    })
};

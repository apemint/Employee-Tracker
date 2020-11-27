//=================================================
//------------DEPENDENCIES-------------------------
//=================================================

const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");

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
    password: "",
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
//==========Add Role
//==========Add Employee


//=================================================
//----------VIEW FUNCTIONS-------------------------
//=================================================

//======== VIEW DEPARTMENTS
function viewDepartments() {
    console.log("Viewing by Department...\n");
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.log(res); //console.table(res)?
        start();
    })
};

//========= VIEW ROLES
function viewRoles() {
    console.log("Viewing by role...\n");
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.log(res); //console.table(res)?
        start();
    })
};

//========= VIEW EMPLOYEES
function viewEmployees() {
    console.log("Viewing all employees...\n");
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res); //console.table(res) here?
        start();
    })
};

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

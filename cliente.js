const inquirer = require("inquirer");

let questions = [
    {
        type: "input",
        name: "clientName",
        message: "Ingresá tu nombre:",
    },
    {
        type: "input",
        name: "clientPhone",
        message: "Ingresá tu número de teléfono:",
    },
    {
        type: "rawlist",
        name: "clientPizzaChoice",
        message: "Elegí el gusto de la pizza:",
        choices: ["Mozarella", "Fugazetta", "Napolitana", "Calabresa", "Cuatro Quesos", "Provolone"]
    },
    {
        type: "list",
        name: "clientPizzaSize",
        message: "Elegí el tamaño de la pizza:",
        choices: ["Individual", "Mediana", "Grande"]
    },
    {
        type: "list",
        name: "clientDrink",
        message: "Elegí la bebida:",
        choices: ["Coca-Cola", "Coca-Cola Zero", "Sprite", "Manaos de Uva", "Schweppes Pomelo"]
    },
    {
        type: "checkbox",
        name: "clientEmpanadasChoice",
        message: "¿Qué gustos de empanadas querés?",
        choices: ["Carne Suave","Carne Picante","Jamón y Queso","Queso y Cebolla","Caprese","Ciruela, Queso y Panceta"]
    }
];

inquirer
    .prompt(questions)
    .then(
        (answers) => {
            console.log(answers)
        });
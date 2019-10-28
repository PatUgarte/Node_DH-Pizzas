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
    }
];

inquirer
    .prompt(questions)
    .then(
        (answers) => {
            console.log(answers)
        });
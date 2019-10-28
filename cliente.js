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
        type: "confirm",
        name: "clientConfirmDrink",
        message: "¿Querés agregar una bebida al pedido?",
        default: true
    },
    {
        type: "list",
        name: "clientDrink",
        message: "Elegí la bebida:",
        choices: ["Coca-Cola", "Coca-Cola Zero", "Sprite", "Manaos de Uva", "Schweppes Pomelo"],
        when: ({ clientConfirmDrink }) => clientConfirmDrink,
    },
    {
        type: "checkbox",
        name: "clientEmpanadasChoice",
        message: "¿Qué gustos de empanadas querés?",
        choices: ["Carne Suave", "Carne Picante", "Jamón y Queso", "Queso y Cebolla", "Caprese", "Ciruela, Queso y Panceta"]
    },
    {
        type: "confirm",
        name: "clientConfirmDelivery",
        message: "¿Querés que te lo enviemos al domicilio?",
        default: false
    },
    {
        type: "input",
        name: "clientAdress",
        message: "Ingesá tu dirección:",
        when: ({ clientConfirmDelivery }) => clientConfirmDelivery,
        validate: (clientAdress) => clientAdress.length > 5 ? true : "¡Ingresá una dirección válida!"
    },
    {
        type: "confirm",
        name: "clientConfirmUsualClient",
        message: "¿Sos cliente habitual?"
    }
];

inquirer
    .prompt(questions)
    .then(
        (answers) => {
            console.log(answers)
        });
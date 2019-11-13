//Módulo instalado de terceros
const inquirer = require("inquirer");
//Módulo nativo
const fileSystem = require("fs");

const pedidosJsonPath = __dirname + "/pedidos.json";
if (!fileSystem.existsSync(pedidosJsonPath)) {
    fileSystem.appendFileSync(pedidosJsonPath, "[\n]");
}

let jsonContent = fileSystem.readFileSync(pedidosJsonPath, { encoding: "utf8" });
jsonContent = JSON.parse(jsonContent);

let questions = [
    {
        type: "input",
        name: "clientName",
        message: "Ingresá tu nombre:",
        validate: (clientName) => clientName.length >= 3 ? true : "¡Ingrese un nombre válido!",
    },
    {
        type: "input",
        name: "clientPhone",
        message: "Ingresá tu número de teléfono (Sin guiones ni espacios):",
        validate: (clientPhone) => clientPhone.length >= 8 && !isNaN(clientPhone) ? true : "¡Ingrese un teléfono válido!",
    },
    {
        type: "rawlist",
        name: "clientPizzaChoice",
        message: "Elegí el gusto de la pizza:",
        choices: ["Fugazzetta", "Mozzarella", "Napolitana", "Calabresa", "Cuatro Quesos", "Provolone"],
        default: 1,
    },
    {
        type: "list",
        name: "clientPizzaSize",
        message: "Elegí el tamaño de la pizza:",
        choices: ["Individual", "Mediana", "Grande"],
        default: 2,
        suffix: "\t Individual(+$430) / Mediana(+$560) / Grande(+$650)",
    },
    {
        type: "confirm",
        name: "clientConfirmDrink",
        message: "¿Querés agregar una bebida al pedido? (+$80)",
        default: true,
    },
    {
        type: "list",
        name: "clientDrink",
        message: "Elegí la bebida:",
        choices: ["Coca-Cola", "Coca-Cola Zero", "Sprite", "Manaos de Uva", "Schweppes Pomelo"],
        when: ({ clientConfirmDrink }) => clientConfirmDrink,
        default: 0,
    },
    {
        type: "confirm",
        name: "clientConfirmDelivery",
        message: "¿Querés que te lo enviemos al domicilio? (+$20)",
        default: false,
    },
    {
        type: "input",
        name: "clientAdress",
        message: "Ingesá tu dirección:",
        when: ({ clientConfirmDelivery }) => clientConfirmDelivery,
        validate: (clientAdress) => clientAdress.length > 5 ? true : "¡Ingresá una dirección válida!",
    },
    {
        type: "confirm",
        name: "clientConfirmUsualClient",
        message: "¿Sos cliente habitual?",
    },
    {
        type: "checkbox",
        name: "clientEmpanadasChoice",
        message: "Por ser cliente habitual te regalamos hasta tres empanadas ¿Qué gustos querés?",
        choices: ["Carne Suave", "Carne Picante", "Jamón y Queso", "Queso y Cebolla", "Caprese", "Ciruela, Queso y Panceta"],
        when: ({ clientConfirmUsualClient }) => clientConfirmUsualClient,
        validate: (empanadas) => empanadas.length <= 3 ? true : "¡Sólo puede elegir hasta tres empanadas!",
    }
];

inquirer
    .prompt(questions)
    .then(answers => {
        let pizzaPrices = { Individual: 430, Mediana: 560, Grande: 650, };
        let drinkPrice = 0;
        let deliveryPrice = 0;
        let pizzaDiscounts = { Individual: 3, Mediana: 5, Grande: 8, };

        console.log(`\n=================== Resumen de tu pedido ===================\n`);
        console.log(`Tus datos son  -   Nombre: ${answers.clientName}   /   Teléfono: ${answers.clientPhone}.`);
        if (answers.clientConfirmDelivery) {
            console.log(`Dirección para la entrega del pedido: ${answers.clientAdress}.`);
            deliveryPrice += 20;
        } else {
            console.log(`Nos indicaste que pasarás a retirar tu pedido por el local.`);
        }

        console.log(`\n=================== Productos solicitados ===================\n`);
        console.log(`\t> Pizza: ${answers.clientPizzaChoice}`);
        console.log(`\t> Tamaño: ${answers.clientPizzaSize}`);
        if (answers.clientConfirmDrink) {
            console.log(`\t> Bebida: ${answers.clientDrink}`)
            drinkPrice += 80;
        } else {
            pizzaDiscounts[answers.clientPizzaSize] *= 0;
        }
        answers.clientConfirmUsualClient ?
            answers.clientEmpanadasChoice.length > 0 ?
                imprimirEmpanadas(answers.clientEmpanadasChoice)
                : console.log(`\nSos un/a Cliente Habitual pero no estás llevando ninguna de las empanada de cortesía.`)
            : console.log(`\nSi fueras un/a Cliente Habitual te llevarías hasta tres empanadas de cortesía con tu compra.`);

        let productsPrice = pizzaPrices[answers.clientPizzaSize] + drinkPrice;
        let discountPercentage = pizzaDiscounts[answers.clientPizzaSize];
        let finalPrice = productsPrice * (1 - discountPercentage / 100) + deliveryPrice;
        console.log(`\n====================== Detalle Cuenta ======================\n`);
        console.log(`Total productos: $${productsPrice}.`);
        console.log(`Total delivery: $${deliveryPrice}.`);
        console.log(`Descuento: ${discountPercentage}%.`);
        console.log(`-----------------------`);
        console.log(`TOTAL: $${finalPrice}.`);
        console.log(`\n============================================================\n`);
        console.log(`Gracias por comprar en DH Pizzas. Esperamos que disfrutes tu pedido.`);

        let date = new Date();
        let thisDate = date.toLocaleDateString("latn");
        let thisTime = date.toLocaleTimeString("en-US", { "hour12": true });
        console.log(`\nFecha: ${thisDate}               Hora: ${thisTime}`);
        console.log();

        let priceAnswers = {
            clientProductsPrice: productsPrice,
            clientDeliveryPrice: deliveryPrice,
            clientTotalDiscount: discountPercentage,
            clientFinalPayment: finalPrice,
        }

        let dateAnswers = {
            clientPurchaseDate: thisDate,
            clientPurchaseTime: thisTime,
        }

        let allTheAnswers = {
            id: jsonContent.length + 1,
            ...answers,
            ...priceAnswers,
            ...dateAnswers,
        }

        console.log(allTheAnswers);

    });

function imprimirEmpanadas(empanadas) {
    console.log(`\t> ${empanadas.length} empanada/s de regalo de:`);
    for (let i = 0; i < empanadas.length; i++) {
        console.log(`\t\t● ${empanadas[i]}.`);
    }
}
const fileSystem = require("fs");
const moment = require("moment");

const pedidosJsonPath = __dirname + "/pedidos.json";
if (!fileSystem.existsSync(pedidosJsonPath)) {
    fileSystem.appendFileSync(pedidosJsonPath, "[]");
}

let jsonContent = fileSystem.readFileSync(pedidosJsonPath, { encoding: "utf8" });
jsonContent = JSON.parse(jsonContent);
let amountOfSells = jsonContent.length;

function filterLength(category, value) {
    let arrayCategory = jsonContent.filter((pedido) => pedido[category] == value);
    return arrayCategory.length;
}

let fugazzettaCount = filterLength("clientPizzaChoice", "Fugazzetta");
let mozzarellaCount = filterLength("clientPizzaChoice", "Mozzarella");
let napolitanaCount = filterLength("clientPizzaChoice", "Napolitana");
let calabresaCount = filterLength("clientPizzaChoice", "Calabresa");
let cuatroQuesosCount = filterLength("clientPizzaChoice", "Cuatro Quesos");
let provoloneCount = filterLength("clientPizzaChoice", "Provolone");

let deliveryCount = filterLength("clientConfirmDelivery", true);

let individualCount = filterLength("clientPizzaSize", "Individual");
let medianaCount = filterLength("clientPizzaSize", "Mediana");
let grandeCount = filterLength("clientPizzaSize", "Grande");

let drinkCount = filterLength("clientConfirmDrink", true);

let usualClientsCount = filterLength("clientConfirmUsualClient", true);

let freeEmpanadasCount = jsonContent.reduce((a, { clientEmpanadasChoice }) => a + (clientEmpanadasChoice ? clientEmpanadasChoice.length : 0),0);

if (amountOfSells == 0) {
    console.log("Actualmente el sistema no tiene pedidos para generar el reporte.");
} else {
    console.log(`
¡Reporte generado con éxito!

|================*** Reporte de ventas ***================|
    > Fecha de generación: ${moment().format("YYYY-MM-DD")}
    > Hora: ${moment().format("hh:mm:ss A")}

|========*** Cantidad de pedidos realizados ***===========|
    > Total: ${amountOfSells}

|========*** Cantidad de pedidos para delivery ***========|
    > Total: ${deliveryCount}

|======*** Cantidad de pizzas vendidas por gusto ***======|
    > Total Fugazzetta: ${fugazzettaCount}
    > Total Mozzarella: ${mozzarellaCount}
    > Total Napolitana: ${napolitanaCount}
    > Total Calabresa: ${calabresaCount}
    > Total Cuatro Quesos: ${cuatroQuesosCount}
    > Total Provolone: ${provoloneCount}

|======*** Cantidad de pizzas vendidas por tamaño ***=====|
    > Total Individuales: ${individualCount}
    > Total Medianas: ${medianaCount}
    > Total Grandes: ${grandeCount}

|==========*** Cantidad de pedidos con bebida ***=========|
    > Total: ${drinkCount}

|=========*** Cantidad de clientes habituales ***=========|
    > Total: ${usualClientsCount}

|=========*** Cantidad de empanadas regaladas ***=========|
    > Total: ${freeEmpanadasCount}
`);
}
const fileSystem = require("fs");
const moment = require("moment");

const pedidosJsonPath = __dirname + "/pedidos.json";
if (!fileSystem.existsSync(pedidosJsonPath)) {
    fileSystem.appendFileSync(pedidosJsonPath, "[\n]");
}

let jsonContent = fileSystem.readFileSync(pedidosJsonPath, { encoding: "utf8" });
jsonContent = JSON.parse(jsonContent);

let amountOfSells = jsonContent.length;

let fugazzettaCount = 0;
let mozzarellaCount = 0;
let napolitanaCount = 0;
let calabresaCount = 0;
let cuatroQuesosCount = 0;
let provoloneCount = 0;

let deliveryCount = 0;

let individualCount = 0;
let medianaCount = 0;
let grandeCount = 0;

let drinkCount = 0;

let usualClientsCount = 0;

let freeEmpanadasCount = 0;

calculateQuantities(jsonContent);

if (amountOfSells == 0) {
    console.log("Actualmente el sistema no tiene pedidos para generar el reporte.");
} else {
    console.log(`
¡Reporte generado con éxito!

|===*** Reporte de ventas ***====|
    > Fecha de generación: ${moment().format("YYYY-MM-DD")}
    > Hora: ${moment().format("hh:mm:ss A")}

|===*** Cantidad de pedidos realizados ***====|
    > Total: ${amountOfSells}

|===*** Cantidad de pedidos para delivery ***====|
    > Total: ${deliveryCount}

|===*** Cantidad de pizzas vendidas por gusto ***====|
    > Total Fugazzetta: ${fugazzettaCount}
    > Total Mozzarella: ${mozzarellaCount}
    > Total Napolitana: ${napolitanaCount}
    > Total Calabresa: ${calabresaCount}
    > Total Cuatro Quesos: ${cuatroQuesosCount}
    > Total Provolone: ${provoloneCount}

|===*** Cantidad de pizzas vendidas por tamaño ***====|
    > Total Individuales: ${individualCount}
    > Total Medianas: ${medianaCount}
    > Total Grandes: ${grandeCount}

|===*** Cantidad de pedidos con bebida ***====|
    > Total: ${drinkCount}

|===*** Cantidad de clientes habituales ***====|
    > Total: ${usualClientsCount}

|===*** Cantidad de empanadas regaladas ***====|
    > Total: ${freeEmpanadasCount}
`);
}

function quantityOfPizzasByType(objectsArray) {
    for (const { clientPizzaChoice } of objectsArray) {
        switch (clientPizzaChoice) {
            case "Fugazzetta":
                fugazzettaCount++;
                break;
            case "Mozzarella":
                mozzarellaCount++;
                break;
            case "Napolitana":
                napolitanaCount++;
                break;
            case "Calabresa":
                calabresaCount++;
                break;
            case "Cuatro Quesos":
                cuatroQuesosCount++;
                break;
            case "Provolone":
                provoloneCount++;
                break;
        }
    }
}

function quantityOfDelivery(objectsArray) {
    for (const { clientConfirmDelivery } of objectsArray) {
        if (clientConfirmDelivery) {
            deliveryCount++;
        }
    }
}

function quantityOfPizzasBySize(objectsArray) {
    for (const { clientPizzaSize } of objectsArray) {
        switch (clientPizzaSize) {
            case "Individual":
                individualCount++;
                break;
            case "Mediana":
                medianaCount++;
                break;
            case "Grande":
                grandeCount++;
                break;
        }
    }
}

function quantityOfDrinks(objectsArray) {
    for (const { clientConfirmDrink } of objectsArray) {
        if (clientConfirmDrink) {
            drinkCount++;
        }
    }
}

function quantityOfUsualClients(objectsArray) {
    for (const { clientConfirmUsualClient } of objectsArray) {
        if (clientConfirmUsualClient) {
            usualClientsCount++;
        }
    }
}

function quantityOfEmpanadas(objectsArray) {
    for (const { clientEmpanadasChoice } of objectsArray) {
        clientEmpanadasChoice ? freeEmpanadasCount += clientEmpanadasChoice.length : "";
    }
}

function calculateQuantities(jsonContent) {
    quantityOfPizzasByType(jsonContent);
    quantityOfDelivery(jsonContent);
    quantityOfPizzasBySize(jsonContent);
    quantityOfDrinks(jsonContent);
    quantityOfUsualClients(jsonContent);
    quantityOfEmpanadas(jsonContent);
}
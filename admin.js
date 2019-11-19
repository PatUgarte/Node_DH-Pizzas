const fileSystem = require("fs");
const moment = require("moment");

const pedidosJsonPath = `${__dirname}/pedidos.json`;
const reportesJsonPath = `${__dirname}/reportes.json`;

function lecturaJson(path) {
    if (!fileSystem.existsSync(path)) {
        fileSystem.appendFileSync(path, "[]");
    }
    let jsonContent = fileSystem.readFileSync(path, { encoding: "utf8" });
    return JSON.parse(jsonContent);
}

function filterLength(category, value) {
    let arrayCategory = pedidosJsonContent.filter((pedido) => pedido[category] == value);
    return arrayCategory.length;
}

let pedidosJsonContent = lecturaJson(pedidosJsonPath);

let amountOfSells = pedidosJsonContent.length;

if (amountOfSells != 0) {

    let fechaActual = moment().format("YYYY-MM-DD");
    let horaActual = moment().format("hh:mm:ss A");
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
    let freeEmpanadasCount = pedidosJsonContent.reduce((a, { clientEmpanadasChoice }) => a + (clientEmpanadasChoice ? clientEmpanadasChoice.length : 0), 0);

    console.log(`
    ¡Reporte generado con éxito!
    
    |================*** Reporte de ventas ***================|
    > Fecha de generación: ${fechaActual}
    > Hora: ${horaActual}
    
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

    let reportesJsonContent = lecturaJson(reportesJsonPath);
    let reportObject = {
        idReporte: reportesJsonContent.length + 1,
        fecha: fechaActual,
        hora: horaActual,
        totalDeVentas: amountOfSells,
        fugazzettasVendidas: fugazzettaCount,
        mozzarellasVendidas: mozzarellaCount,
        napolitanasVendidas: napolitanaCount,
        calabresasVendidas: calabresaCount,
        cuatroQuesosVendidas: cuatroQuesosCount,
        provolonesVendidas: provoloneCount,
        deliverySolicitados: deliveryCount,
        individualesVendidas: individualCount,
        medianasVendidas: medianaCount,
        grandesVendidas: grandeCount,
        bebidasVeniddas: drinkCount,
        clientesUsuales: usualClientsCount,
        empanadasCortesia: freeEmpanadasCount,
    }
    reportesJsonContent.push(reportObject);
    reportesJsonContent = JSON.stringify(reportesJsonContent, null, 2);
    fileSystem.writeFileSync(reportesJsonPath, reportesJsonContent);

} else {
    console.log("Actualmente el sistema no tiene pedidos para generar el reporte.");
}


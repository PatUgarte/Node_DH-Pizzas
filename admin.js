const fileSystem = require("fs");

const pedidosJsonPath = __dirname + "/pedidos.json";
if (!fileSystem.existsSync(pedidosJsonPath)) {
    fileSystem.appendFileSync(pedidosJsonPath, "[\n]");
}

let jsonContent = fileSystem.readFileSync(pedidosJsonPath, { encoding: "utf8" });
jsonContent = JSON.parse(jsonContent);
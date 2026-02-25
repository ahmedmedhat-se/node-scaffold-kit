import initModule from "../lib/init.js";
import generatorModule from "../lib/generator.js";

const init = initModule.createStructure;
const generator = generatorModule.generate;

const args = process.argv.slice(2);
const command = args[0];
const name = args[1];

if (!command){
    console.log("Please specify a command, use help to display commands.");
    process.exit(1);
}

switch (command){
    case "init":
        init();
        break;
    case "create:model":
        if (!name) {
            console.log("Please provide a model name.");
            process.exit(1);
        }
        generator("model", name);
        break;
    case "create:controller":
        if (!name) {
            console.log("Please provide a controller name.");
            process.exit(1);
        }
        generator("controller", name);
        break;
    case "create:route":
        if (!name) {
            console.log("Please provide a route name.");
            process.exit(1);
        }
        generator("route", name);
        break;
    case "create:all":
        if (!name) {
            console.log("Please provide a base name.");
            process.exit(1);
        }
        generator("model", name);
        generator("controller", name);
        generator("route", name);
        break;
    default:
        console.log(`Unknown command: ${command}`);
        process.exit(1);
};
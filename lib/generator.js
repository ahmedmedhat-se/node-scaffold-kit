import fs from "fs";
import path from "path";
import * as utils from "../lib/utils.js";
import * as templates from "../lib/templates.js";

export function generate(type, rawName) {
  if (!utils.validateName(rawName)) {
    console.log(`Invalid name: "${rawName}". Use only letters, numbers, underscores, and start with a letter.`);
    return;
  }

  const targetPath = utils.getTargetPath(type, rawName);
  if (utils.fileExists(targetPath)) {
    console.log(`File already exists: ${targetPath}`);
    return;
  }

  let content = '';
  const pascalName = utils.toPascalCase(rawName);
  const controllerName = utils.toControllerName(rawName);

  switch (type) {
    case 'model':
      content = templates.modelTemplate(pascalName);
      break;
    case 'controller':
      content = templates.controllerTemplate(controllerName, pascalName);
      break;
    case 'route':
      content = templates.routeTemplate(rawName, controllerName);
      break;
    default:
      console.log('Unknown type');
      return;
  }

  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(targetPath, content, 'utf8');
  console.log(`Created: ${targetPath}`);
}

export default { generate };
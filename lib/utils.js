import fs from "fs";
import path from "path";

export function toPascalCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
}

export function toControllerName(str) {
  return toPascalCase(str) + 'Controller';
}

export function toRouteFileName(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '') + '.routes.js';
}

export function validateName(str) {
  return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(str);
}

export function getTargetPath(type, name) {
  const baseDir = process.cwd();
  let folder, fileName;
  switch (type) {
    case 'model':
      folder = 'models';
      fileName = toPascalCase(name) + '.js';
      break;
    case 'controller':
      folder = 'controllers';
      fileName = toControllerName(name) + '.js';
      break;
    case 'route':
      folder = 'routes';
      fileName = toRouteFileName(name);
      break;
    default:
      throw new Error('Unknown type');
  }
  return path.join(baseDir, folder, fileName);
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
};
import fs from "fs";
import path from "path";

export function createStructure() {
  const folders = ['models', 'controllers', 'routes'];
  const basePath = process.cwd();

  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Created folder: ${folderPath}`);
    } else {
      console.log(`Folder already exists: ${folderPath}`);
    }
  });
}

export default { createStructure };
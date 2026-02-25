export function modelTemplate(className) {
  return `export class ${className} {
  constructor(data) {
    this.data = data;
  }

  static findAll() {
    // Placeholder: implement your database logic
    return [];
  }

  static findById(id) {
    // Placeholder
    return null;
  }

  save() {
    // Placeholder
    return this;
  }
};
`;
}

export function controllerTemplate(controllerName, modelName) {
  return `import ${modelName} from '../models/${modelName}.js';

export const ${controllerName} = {
  index(req, res) {
    const items = ${modelName}.findAll();
    res.json(items);
  },

  show(req, res) {
    const item = ${modelName}.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  },

  store(req, res) {
    const newItem = new ${modelName}(req.body);
    newItem.save();
    res.status(201).json(newItem);
  },

  update(req, res) {
    // implementation
    res.json({ message: 'Updated' });
  },

  destroy(req, res) {
    // implementation
    res.json({ message: 'Deleted' });
  }
};
`;
}

export function routeTemplate(routeBaseName, controllerName) {
  const routePath = routeBaseName.toLowerCase();
  return `import express from 'express';
import { ${controllerName} } from '../controllers/${controllerName}.js';

const router = express.Router();

router.get('/${routePath}', ${controllerName}.index);
router.get('/${routePath}/:id', ${controllerName}.show);
router.post('/${routePath}', ${controllerName}.store);
router.put('/${routePath}/:id', ${controllerName}.update);
router.delete('/${routePath}/:id', ${controllerName}.destroy);

export default router;
`;
};
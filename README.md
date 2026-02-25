# 🔐 Node Scaffold Kit

> Developed by **Ahmed Medhat**

---
## 📋 Project Overview
**Node Scaffold Kit** is a lightweight, standalone database migration and project scaffolding tool built with pure Node.js core modules and minimal dependencies. It provides a structured approach to managing database schema changes and bootstrapping Node.js applications.

**How it works:**
1. **migrate:create** a migration file (like creating a Git commit)
2. **migrate:up / migrate:down** the `up` method for changes, `down` method for rollback
3. **migrate:rollback** if something goes wrong
4. **migrate:list** displays migrations list
5. **migrate:status** which migrations have been executed
6. **test:db** test script for testing database connection

**Developed by:** Ahmed Medhat  
**Project Type:** Backend Development Kit 
**License:** Proprietary – All rights reserved

---
### Node.js Project Architecture
```js
node-scaffold-kit/
├── bin/
│   └── init.js
├── config/
│   └── database.js
├── core/
│   ├── migration-manager.js
│   └── migration-runner.js
├── lib/
│   ├── generator.js
│   ├── init.js
│   ├── template.js
│   └── utils.js
├── migrations/
├── node_modules/
├── tests/
│   └── test-connection.js
├── .env
├── .gitignore
├── migrate.js
├── package-lock.json
├── package.json
└── README.md
```

---
## 🛠️ Technologies Used
| Technology                                                                                                                | Purpose                           | Version |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------- |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)                | JavaScript Runtime Environment    | 18.x+   |
| ![Dotenv](https://img.shields.io/badge/Dotenv-000000?style=for-the-badge&logo=dotenv&logoColor=white)                     | Environment Variables Loader      | 16.x    |
| ![MySQL2](https://img.shields.io/badge/MySQL2-005C84?style=for-the-badge&logo=mysql&logoColor=white)                      | MySQL Database Driver             | 3.x     |

---
## 📦 Prerequisites
| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18.0.0 |
| **MySQL** | >= 8.0 or >= 5.7 |
| **npm** | >= 9.0.0 |

---
## 🛠️ Installation
### Step 1: Clone or Create Project
```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize npm project
npm init -y

# Install Dependencies
npm i mysql2 dotenv
```

---
## 📦 Available NPM Scripts
The project includes a set of utility scripts to simplify development, database migrations, and seeding.

## App Initialization & Scaffolding
### Initialize project structure (creates models, controllers, routes folders)
```bash
npm run init
```

### Create models
```bash
npm run create:model ModelName
```

### Create controllers
```bash
npm run create:controller ControllerName
```

### Create routes
```bash
npm run create:route RouteName
```

### Create model, controller, and route all at once
```bash
npm run create:all ServiceName
```

## 🗄️ Database Migrations
### Runs all pending database migrations.
```bash
npm run migrate
```

### Rolls back the latest executed migration.
```bash
npm run migrate:rollback
```

### Lists all migrations with their execution status.
```bash
npm run migrate:list
```

## 🌱 Database Seeding
### Seeds the database with initial / default data.
```bash
npm run db:seed
```
### Clears all seeded data from the database.
```bash
npm run db:clear
```

## 🧪 Testing Database Connection
```bash
npm run test:db
```

---
## 📝 Usage Examples
### Creating a complete CRUD for a User resource:
```bash
# Initialize project structure
npm run init

# Create all files for User resource
npm run create:all User

# Create migration for users table
npm run migrate:create create_users_table
```

### Managing migrations workflow:
```bash
# Create a new migration
npm run migrate:create add_email_to_users

# Apply migrations
npm run migrate:up

# If something goes wrong, rollback
npm run migrate:down

# Check migration status
npm run migrate:list
```

---
## ⚙️ Configuration
The migration system uses a **migrations** table in your database to track executed migrations. Configuration is handled through environment variables in **.env** file.

---
## 📄 License
**PROPRIETARY LICENSE**
© 2026 - Ahmed Medhat. All Rights Reserved.
This project is a personal, non-commercial work created solely for the purpose of demonstrating full-stack web development skills.

## 👥 Author
* **Ahmed Medhat** – Junior Backend Engineer
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import MigrationManager from './migration-manager.js';
import { db_config } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MigrationRunner {
    constructor(migrationsPath = path.join(__dirname, '../migrations')) {
        this.migrationsPath = migrationsPath;
        this.manager = new MigrationManager();
    }

    async createMigration(name) {
        const timestamp = Date.now();
        const filename = `${timestamp}-${name}.js`;
        const filepath = path.join(this.migrationsPath, filename);
        const template = `export const up = async (db) => {
    // Create table
    await db.execute(\`
        CREATE TABLE IF NOT EXISTS ${name} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    \`);
    
    console.log('Created ${name} table');
};

export const down = async (db) => {
    // Drop table
    await db.execute(\`DROP TABLE IF EXISTS ${name}\`);
    console.log('Dropped ${name} table');
};
`;

        await fs.writeFile(filepath, template);
        console.log(`Created migration: ${filename}`);
        return filename;
    }

    async getMigrationFiles() {
        const files = await fs.readdir(this.migrationsPath);
        return files.filter(f => f.endsWith('.js')).sort();
    }

    async loadMigration(filename) {
        const filepath = path.join(this.migrationsPath, filename);
        const fileUrl = new URL(`file://${filepath.replace(/\\/g, '/')}`);
        const migration = await import(fileUrl.href);
        return migration;
    }

    async runMigrations() {
        await this.manager.createMigrationsTable();
        
        const files = await this.getMigrationFiles();
        const executed = await this.manager.getExecutedMigrations();
        const executedNames = executed.map(e => e.name);
        const pending = files.filter(f => !executedNames.includes(f));

        if (pending.length === 0) {
            console.log('No pending migrations');
            return;
        }

        console.log(`Found ${pending.length} pending migrations`);
        
        for (const file of pending) {
            console.log(`Running: ${file}`);
            
            const migration = await this.loadMigration(file);
            await migration.up(db_config);
            await this.manager.addMigration(file);
            
            console.log(`Completed: ${file}`);
        }
    }

    async rollbackLast() {
        await this.manager.createMigrationsTable();
        
        const executed = await this.manager.getExecutedMigrations();
        
        if (executed.length === 0) {
            console.log('No migrations to rollback');
            return;
        }

        const lastMigration = executed[executed.length - 1];
        console.log(`Rolling back: ${lastMigration.name}`);
        
        const migration = await this.loadMigration(lastMigration.name);
        await migration.down(db_config);
        await this.manager.removeMigration(lastMigration.name);
        
        console.log(`Rolled back: ${lastMigration.name}`);
    }

    async rollbackTo(migrationName) {
        await this.manager.createMigrationsTable();
        
        const executed = await this.manager.getExecutedMigrations();
        const migrationIndex = executed.findIndex(m => m.name === migrationName);
        
        if (migrationIndex === -1) {
            console.log(`Migration ${migrationName} not found`);
            return;
        }

        const toRollback = executed.slice(migrationIndex + 1).reverse();
        
        for (const migration of toRollback) {
            console.log(`Rolling back: ${migration.name}`);
            const migrationModule = await this.loadMigration(migration.name);
            await migrationModule.down(db_config);
            await this.manager.removeMigration(migration.name);
            console.log(`Rolled back: ${migration.name}`);
        }
    }

    async reset() {
        await this.manager.createMigrationsTable();
        
        const executed = await this.manager.getExecutedMigrations();
        const toRollback = executed.reverse();
        
        for (const migration of toRollback) {
            console.log(`Rolling back: ${migration.name}`);
            const migrationModule = await this.loadMigration(migration.name);
            await migrationModule.down(db_config);
            await this.manager.removeMigration(migration.name);
            console.log(`Rolled back: ${migration.name}`);
        }
        
        console.log('Database reset complete');
    }

    async refresh() {
        await this.reset();
        await this.runMigrations();
    }

    async listMigrations() {
        await this.manager.createMigrationsTable();
        
        const files = await this.getMigrationFiles();
        const executed = await this.manager.getExecutedMigrations();
        const executedNames = executed.map(e => e.name);

        console.log('\nMigrations:');
        console.log('='.repeat(50));
        console.log('Status  | Migration Name');
        console.log('='.repeat(50));
        
        for (const file of files) {
            const status = executedNames.includes(file) ? 'Completed' : 'Pending';
            console.log(`${status}     | ${file}`);
        }
        
        console.log('='.repeat(50));
        console.log(`Total: ${files.length} | Executed: ${executed.length} | Pending: ${files.length - executed.length}`);
    }

    async getMigrationStatus() {
        await this.manager.createMigrationsTable();
        
        const files = await this.getMigrationFiles();
        const executed = await this.manager.getExecutedMigrations();
        
        return {
            total: files.length,
            executed: executed.length,
            pending: files.length - executed.length,
            files: files,
            executedMigrations: executed
        };
    }
};

export default MigrationRunner;
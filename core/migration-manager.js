import { db_config } from '../config/database.js';

class MigrationManager {
    constructor() {
        this.tableName = 'migrations';
    }

    async createMigrationsTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        await db_config.execute(query);
        console.log('Migrations table ready');
    }

    async getExecutedMigrations() {
        const [rows] = await db_config.execute(`SELECT * FROM ${this.tableName} ORDER BY id ASC`);
        return rows;
    }

    async addMigration(migrationName) {
        const query = `INSERT INTO ${this.tableName} (name) VALUES (?)`;
        await db_config.execute(query, [migrationName]);
    }

    async removeMigration(migrationName) {
        const query = `DELETE FROM ${this.tableName} WHERE name = ?`;
        await db_config.execute(query, [migrationName]);
    }

    async isMigrationExecuted(migrationName) {
        const [rows] = await db_config.execute(
            `SELECT * FROM ${this.tableName} WHERE name = ?`,
            [migrationName]
        );
        return rows.length > 0;
    }
}

export default MigrationManager;
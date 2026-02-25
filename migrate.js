import MigrationRunner from './core/migration-runner.js';

const command = process.argv[2];
const param = process.argv[3];
const runner = new MigrationRunner();

async function main() {
    try {
        switch (command) {
            case 'create':
                if (!param) {
                    console.log('Error: Migration name required');
                    console.log('Example: node migrate.js create users');
                    process.exit(1);
                }
                await runner.createMigration(param);
                break;

            case 'up':
                await runner.runMigrations();
                break;

            case 'down':
                await runner.rollbackLast();
                break;

            case 'rollback':
                if (param) {
                    await runner.rollbackTo(param);
                } else {
                    await runner.rollbackLast();
                }
                break;

            case 'reset':
                await runner.reset();
                break;

            case 'refresh':
                await runner.refresh();
                break;

            case 'list':
                await runner.listMigrations();
                break;

            case 'status':
                const status = await runner.getMigrationStatus();
                console.log(status);
                break;

            default:
                console.log('\nDatabase Migration Tool');
                console.log('='.repeat(50));
                console.log('Commands:');
                console.log('  node migrate.js create <name>     Create new migration');
                console.log('  node migrate.js up                Run all pending migrations');
                console.log('  node migrate.js down              Rollback last migration');
                console.log('  node migrate.js rollback <name>   Rollback to specific migration');
                console.log('  node migrate.js reset             Rollback all migrations');
                console.log('  node migrate.js refresh           Reset and run all migrations');
                console.log('  node migrate.js list              List all migrations with status');
                console.log('  node migrate.js status            Show migration status as JSON');
                console.log('='.repeat(50));
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
    process.exit(0);
};

main();
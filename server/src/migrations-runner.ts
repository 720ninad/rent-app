import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Configuration for the PostgreSQL database
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres-db-nestjs',
  password: 'postgres',
  port: 5432,
});

// Function to compute the SHA-256 hash of a file
function computeHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Function to check if a migration has already been executed
async function hasMigrationRun(migrationName: string): Promise<boolean> {
  const res = await client.query(
    'SELECT migration_name FROM migrations WHERE migration_name = $1',
    [migrationName],
  );
  return res.rows.length > 0;
}

// Function to get the stored hash for a migration
async function getMigrationHash(migrationName: string): Promise<string | null> {
  const res = await client.query(
    'SELECT file_hash FROM migrations WHERE migration_name = $1',
    [migrationName],
  );
  return res.rows.length > 0 ? res.rows[0].file_hash : null;
}

// Function to log the executed migration in the migrations table
async function logMigration(
  migrationName: string,
  fileHash: string,
): Promise<void> {
  await client.query(
    'INSERT INTO migrations (migration_name, file_hash) VALUES ($1, $2)',
    [migrationName, fileHash],
  );
}

// Function to run migrations
async function runMigrations() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to the database.');

    // Create the migrations table if it doesn't exist
    const createMigrationsTable = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) NOT NULL,
        file_hash VARCHAR(64),
        executed_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await client.query(createMigrationsTable);

    // Get all SQL files from the migrations folder
    const migrationDir = path.join(__dirname, '../migrations');
    const migrationFiles = fs
      .readdirSync(migrationDir)
      .filter((file) => file.endsWith('.sql'));

    // Loop through each SQL file and execute the queries
    for (const file of migrationFiles) {
      const filePath = path.join(migrationDir, file);
      const sqlQuery = fs.readFileSync(filePath, 'utf8');

      const migrationName = file;
      const fileHash = computeHash(sqlQuery);

      // Check if the migration has already run
      const alreadyExecuted = await hasMigrationRun(migrationName);
      if (alreadyExecuted) {
        const storedHash = await getMigrationHash(migrationName);
        if (storedHash === fileHash) {
          console.log(
            `Skipping migration: ${migrationName}, already executed.`,
          );
          continue;
        } else {
          throw new Error(
            `Migration file ${migrationName} has been modified. Hash mismatch detected.`,
          );
        }
      }

      try {
        console.log(`Running migration: ${migrationName}`);
        await client.query(sqlQuery); // Execute the SQL query
        await logMigration(migrationName, fileHash); // Log the migration with hash
        console.log(`Migration ${migrationName} executed successfully.`);
      } catch (error) {
        console.error(
          `Error executing migration ${migrationName}:`,
          error.message,
        );
      }
    }
  } catch (error) {
    console.error('Database connection error:', error.message);
  } finally {
    // Disconnect from the database
    await client.end();
    console.log('Disconnected from the database.');
  }
}

// Run the migration
runMigrations();

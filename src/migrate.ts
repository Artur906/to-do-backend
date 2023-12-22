// migrate.js
import fs from 'fs';
import path from 'path';
import { pool } from './db';

async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../migrations');
  const migrationFiles = fs.readdirSync(migrationsDir).sort();

  for (const migrationFile of migrationFiles) {
    const migrationPath = path.join(migrationsDir, migrationFile);
    const migrationSql = fs.readFileSync(migrationPath, 'utf-8');

    console.log(`Applying migration: ${migrationFile}`);
    await pool.query(migrationSql);
  }

  console.log('Migrations completed');
  pool.end();
}

runMigrations();

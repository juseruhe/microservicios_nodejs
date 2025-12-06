import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function runMigration() {
  // Esperar a que MySQL esté listo
  let connected = false;
  while (!connected) {
    try {
      await pool.query("SELECT 1");
      connected = true;
      console.log("MySQL listo, ejecutando migración...");
    } catch (e) {
      console.log("Esperando MySQL... reintentando en 2s");
      await sleep(2000);
    }
  }

  try {
    const filePath = path.join(__dirname, "migrations", "001_create_roles_table.sql");
    const sql = fs.readFileSync(filePath, "utf8");
    await pool.query(sql);
    console.log("Migración ejecutada correctamente.");
  } catch (error) {
    console.error("Error ejecutando migración:", error);
  }
}

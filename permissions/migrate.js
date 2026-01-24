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

     // ✅ Crear base de datos si no existe
    const dbName = process.env.DB_NAME;
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Base de datos '${dbName}' verificada/creada`);

    // ✅ Usar la base de datos
    await pool.query(`USE \`${dbName}\``);
    
    // 🔍 Verificar si la tabla YA existe
    const [exists] = await pool.query(`
      SELECT COUNT(*) AS count
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      AND table_name = 'permissions'
    `);

    if (exists[0].count > 0) {
      console.log("⚠️ La tabla 'permissions' ya existe. No se ejecuta migración.");
      return;
    }

    // ✔ Si no existe, ejecutar la migración
    const filePath = path.join(__dirname, "migrations", "001_create_permissions_table.sql");
    const sql = fs.readFileSync(filePath, "utf8");

    await pool.query(sql);
    console.log("✅ Migración ejecutada correctamente.");

  } catch (error) {
    console.error("❌ Error ejecutando migración:", error);
  }
}

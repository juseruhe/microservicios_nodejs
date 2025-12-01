import { pool } from "./db.js";

export const initDB = async () => {
  try {
    // Crear tabla roles si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Migraciones ejecutadas correctamente.");
  } catch (error) {
    console.error("Error ejecutando migraciones:", error);
  }
};

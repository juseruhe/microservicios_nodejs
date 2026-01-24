import { pool } from "../config/db.js";

export const PermissionRepository = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM permissions");
    return rows;
  }, 

    async create(name) {
    const [result] = await pool.query("INSERT INTO permissions (name) VALUES (?)", [name]);
    return { id: result.insertId, name };
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM permissions WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;

},

async update(id, name) {
    const [result] = await pool.query("UPDATE permissions SET name = ? WHERE id = ?", [name, id]);
    if(result.affectedRows === 0) {
      return null;
    }

    return { id, name };
  },

  async delete(id) {
  const [result] = await pool.query("DELETE FROM permissions WHERE id = ?", [id]);
  if (result.affectedRows === 0) {
    return false; // No existe el permiso
  }

  return true; // Eliminado correctamente
}


}
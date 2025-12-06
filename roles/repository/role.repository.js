import { pool } from "../config/db.js";

export const RoleRepository = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM roles");
    return rows;
  }, 

    async create(name) {
    const [result] = await pool.query("INSERT INTO roles (name) VALUES (?)", [name]);
    return { id: result.insertId, name };
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;

},

async update(id, name) {
    const [result] = await pool.query("UPDATE roles SET name = ? WHERE id = ?", [name, id]);
    if(result.affectedRows === 0) {
      return null;
    }

    return { id, name };
  },

}
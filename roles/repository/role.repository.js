import { pool } from "../config/db";

export const RoleRepository = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM roles");
    return rows;
  }, 

    async create(name) {
    const [result] = await pool.query("INSERT INTO roles (name) VALUES (?)", [name]);
    return { id: result.insertId, name };
  }

}
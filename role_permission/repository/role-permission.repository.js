import { pool } from "../config/db.js";

export const RolePermissionRepository = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM role_permissions");
    return rows;
  }, 

    async create(role_id, permission_id) {
    const [result] = await pool.query("INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)", [role_id, permission_id]);
    return { id: result.insertId, role_id, permission_id };
  },

 async create(roleId, permissionId) {
    const [result] = await pool.query(
      "INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)",
      [roleId, permissionId]
    );

    return {
      id: result.insertId,
      roleId,
      permissionId
    };
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM role_permissions WHERE id = ?",
      [id]
    );

    return rows.length ? rows[0] : null;
  },

  async findByRoleId(roleId) {
    const [rows] = await pool.query(
      "SELECT * FROM role_permissions WHERE role_id = ?",
      [roleId]
    );

    return rows;
  },

  async update(id, roleId, permissionId) {
    const [result] = await pool.query("UPDATE role_permissions SET role_id = ?, permission_id = ? WHERE id = ?", [roleId, permissionId, id]);
    if(result.affectedRows === 0) {
      return null;
    }
  },

  
    async delete(id) {
    const [result] = await pool.query("DELETE FROM role_permissions WHERE id = ?", [id]);
  
    if (result.affectedRows === 0) {
      return false; // No existe el rol-permission
    }
  
    return true; // Eliminado correctamente
  }
  

}
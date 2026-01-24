import { PermissionRepository } from "../repository/permission.repository.js";

export const PermissionService = {
  getAllPermissions() {
    return PermissionRepository.findAll();
  },

   createPermission(name) {
    return PermissionRepository.create(name);
  },

  findPermissionById(id) {
    const permission = PermissionRepository.findById(id);

    if(!permission){
      throw new Error('Permission not found');
    }
    return permission;
  },

  update(id, name) {
    const updatedRole = PermissionRepository.update(id, name);

    if(!updatedRole){
      throw new Error('Permission not found');
    }

    return updatedRole;
  },


    async deletePermission(id) {
    const deleted = await PermissionRepository.delete(id);

    if (!deleted) {
      throw new Error("Permission not found");
    }

    return { message: "Permission successfully deleted" };
  }
}
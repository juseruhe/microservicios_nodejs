import { RoleRepository } from "../repository/role.repository.js";

export const RoleService = {
  getAllRoles() {
    return RoleRepository.findAll();
  },

   createRole(name) {
    return RoleRepository.create(name);
  },

  findRoleById(id) {
    const role = RoleRepository.findById(id);

    if(!role){
      throw new Error('Role not found');
    }
    return role;
  }
}
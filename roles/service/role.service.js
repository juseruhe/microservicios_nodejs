import { RoleRepository } from "../repositories/role.repository.js";

export const RoleService = {
  getAllRoles() {
    return RoleRepository.findAll();
  },

   createRole(name) {
    return RoleRepository.create(name);
  }
}
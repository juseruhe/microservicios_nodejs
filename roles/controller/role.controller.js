import { RoleService } from "../service/role.service.js";

export const getRoles = async (req, res) => {
  const roles = await RoleService.getAllRoles();
  res.json(roles);
};

export const createRole = async (req, res) => {
  const { name } = req.body;
  const role = await RoleService.createRole(name);
  res.status(201).json(role);
};
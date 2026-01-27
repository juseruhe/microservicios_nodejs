import { RolePermissionRepository } from "../repository/role-permission.repository.js";
import axios from "axios";

export const RolePermissionService = {

    async create(roleId, permissionId) {

    // 🔎 Validar rol
  const roleResponse =  await axios.get(`${process.env.HOST_ROLE}/roles/${roleId}`,{
      headers: {
        'api-key': process.env.API_KEY
      }
    })

    if(!roleResponse.data?.id) {
      throw new Error("Role not found");
    }

    // 🔎 Validar permiso
  const permissionResponse = await axios.get(`${process.env.HOST_PERMISSION}/permissions/${permissionId}`,{
      headers: {
        'api-key': process.env.API_KEY
      }
    })

    if(!permissionResponse.data?.id) {
      throw new Error("Permission not found");
    }

    return RolePermissionRepository.create(roleId, permissionId);
  },

  async getById(id) {
    const rp = await RolePermissionRepository.findById(id);

    if (!rp) {
      throw new Error("Role permission not found");
    }

    // 🔗 Obtener nombres desde otros MS
    const [roleRes, permissionRes] = await Promise.all([
      axios.get(`${process.env.HOST_ROLE}/roles/${rp.role_id}`,{
        headers: {
          'api-key': process.env.API_KEY
        }
      }),
      axios.get(`${process.env.HOST_PERMISSION}/permissions/${rp.permission_id}`,{
        headers: {
          'api-key': process.env.API_KEY
        }
      })
    ]);

    return {
      id: rp.id,
      role: {
        id: rp.role_id,
        name: roleRes.data.name
      },
      permission: {
        id: rp.permission_id,
        name: permissionRes.data.name
      }
    };
  }

  
}
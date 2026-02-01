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
  },

  async getAllRolePermissions(){

    const rolePermission = await RolePermissionRepository.findAll();

    if(!rolePermission || rolePermission.length === 0){
      return [];
    }

        // 🔎 Validar rol
  const roleResponse =  await axios.get(`${process.env.HOST_ROLE}/roles`,{
      headers: {
        'api-key': process.env.API_KEY
      }
    })

        // 🔎 Validar permiso
  const permissionResponse = await axios.get(`${process.env.HOST_PERMISSION}/permissions`,{
      headers: {
        'api-key': process.env.API_KEY
      }
    })

    const role = new Map(
      roleResponse.data.map(r => [r.id, r])
    )

    const permission = new Map(
      permissionResponse.data.map(p => [p.id, p])
    )
    
    return rolePermission.map(rp => ({
      id: rp.id,
      role: {
        id: rp.role_id,
        name: role.get(rp.role_id)?.name || null
      },
      permission: {
        id: rp.permission_id,
        name: permission.get(rp.permission_id)?.name || null
      }
    }) );


  },

   async update(id, roleId, permissionId) {
    const rp = await RolePermissionRepository.findById(id);

    if (!rp) {
      throw new Error("Role permission not found");
    }

    // 🔗 Obtener nombres desde otros MS
    const [roleRes, permissionRes] = await Promise.all([
      axios.get(`${process.env.HOST_ROLE}/roles/${roleId}`,{
        headers: {
          'api-key': process.env.API_KEY
        }
      }),
      axios.get(`${process.env.HOST_PERMISSION}/permissions/${permissionId}`,{
        headers: {
          'api-key': process.env.API_KEY
        }
      })
    ]);


    RolePermissionRepository.update(id, roleId, permissionId);


    return {
      id: rp.id,
      role: {
        id: roleRes.data.id,
        name: roleRes.data.name
      },
      permission: {
        id: permissionRes.data.id,
        name: permissionRes.data.name
      }
    };
  },

  async delete(id) {
   const deleted = await RolePermissionRepository.delete(id);

    if (!deleted) {
      throw new Error("Role permission not found");
    }

    return { message: "Role permission deleted successfully" };


  }


  
}
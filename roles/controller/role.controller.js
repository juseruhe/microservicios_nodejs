import { RoleService } from "../service/role.service.js";

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags:
 *       - Roles
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles
 *
 *   post:
 *     summary: Crear un nuevo rol
 *     tags:
 *       - Roles
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Administrador
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *
 * /roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     tags:
 *       - Roles
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a buscar
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Administrador
 *       404:
 *         description: Rol no encontrado
 */

export const getRoles = async (req, res) => {
  const roles = await RoleService.getAllRoles();
  res.json(roles);
};

export const createRole = async (req, res) => {
  const { name } = req.body;
  const role = await RoleService.createRole(name);
  res.status(201).json(role);
};


export const getRoleById = async (req, res) => {
try{
  const {id} = req.params;
  const role = await RoleService.findRoleById(id);
  res.status(201).json(role);

}catch(e){
  res.status(404).json({message: e.message});
}
};


  export const hola = async (req, res) => {
    const hola = await "Hola desde el servicio de roles";
    res.status(201).json(hola);
  };

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
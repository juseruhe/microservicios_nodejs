import { RolePermissionService } from "../service/role-permission.service.js";

/**
 * @openapi
 * tags:
 *   name: RolePermission
 *   description: Role-Permission management
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RolePermissionCreate:
 *       type: object
 *       required:
 *         - roleId
 *         - permissionId
 *       properties:
 *         roleId:
 *           type: integer
 *           example: 1
 *         permissionId:
 *           type: integer
 *           example: 3
 *
 *     RolePermissionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: ADMIN
 *         permission:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 3
 *             name:
 *               type: string
 *               example: CREATE_USER
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Permission not found
 */

/**
 * @openapi
 * /role-permissions:
 *   post:
 *     summary: Create a role-permission relation
 *     tags:
 *       - RolePermission
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermissionCreate'
 *     responses:
 *       201:
 *         description: Role-permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 roleId:
 *                   type: integer
 *                   example: 1
 *                 permissionId:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Invalid role or permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const createRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;
    const result = await RolePermissionService.create(roleId, permissionId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @openapi
 * /role-permissions/{id}:
 *   get:
 *     summary: Get role-permission by ID
 *     tags:
 *       - RolePermission
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Role-permission detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RolePermissionResponse'
 *       404:
 *         description: Role-permission not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const getRolePermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await RolePermissionService.getById(id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

import { PermissionService } from "../service/permission.service.js";

/**
 * @openapi
 * /permissions:
 *   get:
 *     summary: Obtener todos los permisos
 *     tags:
 *       - Permisos
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Lista de permisos
 *
 *   post:
 *     summary: Crear un nuevo permiso
 *     tags:
 *       - Permisos
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
 *                 example: Leer
 *     responses:
 *       201:
 *         description: Permiso creado correctamente
 *
 * /permissions/{id}:
 *   get:
 *     summary: Obtener un permiso por ID
 *     tags:
 *       - Permisos
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso encontrado
 *       404:
 *         description: Permiso no encontrado
 *
 *   put:
 *     summary: Actualizar un permiso por ID
 *     tags:
 *       - Permisos
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Nuevo nombre del permiso
 *     responses:
 *       200:
 *         description: Permiso actualizado correctamente
 *       404:
 *         description: Permiso no encontrado
 *
 *   delete:
 *     summary: Eliminar un permiso por ID
 *     tags:
 *       - Permisos
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 */

export const getPermissions = async (req, res) => {
  const permissions = await PermissionService.getAllPermissions();
  res.json(permissions);
};

export const createPermission = async (req, res) => {
  const { name } = req.body;
  const permission = await PermissionService.createPermission(name);
  res.status(201).json(permission);
};


export const getPermissionById = async (req, res) => {
try{
  const {id} = req.params;
  const permission = await PermissionService.findPermissionById(id);
  res.status(201).json(permission);

}catch(e){
  res.status(404).json({message: e.message});
}
};

export const updatePermission = async (req, res) => {

  try{

    const {id} = req.params;
    const {name} = req.body;

    const updatedPermission = await PermissionService.update(id, name);
    res.status(201).json(updatedPermission);

  }catch(e){
    res.status(404).json({message: e.message});
  }
}


export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await PermissionService.deletePermission(id);

    res.status(200).json(result);

  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};



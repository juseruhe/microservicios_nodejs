import express from "express";
import { getRolePermissionById, createRolePermission, getRolePermissions, updateRolePermission, deleteRolePermission } from "../controller/role-permission.controller.js";

const router = express.Router();

router.get("/", getRolePermissions);
router.post("/", createRolePermission);
router.get("/:id", getRolePermissionById); 
router.put("/:id", updateRolePermission);
router.delete("/:id", deleteRolePermission);
export default router;

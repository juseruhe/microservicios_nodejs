import express from "express";
import { getRolePermissionById, createRolePermission } from "../controller/role-permission.controller.js";

const router = express.Router();

//router.get("/", getRoles);
router.post("/", createRolePermission);
router.get("/:id", getRolePermissionById); 
//router.put("/:id", updateRole);
//router.delete("/:id", deleteRole);
export default router;

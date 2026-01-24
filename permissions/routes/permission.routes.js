import express from "express";
import { getPermissions,createPermission,getPermissionById, updatePermission,deletePermission } from "../controller/permission.controller.js";

const router = express.Router();

router.get("/", getPermissions);
router.post("/", createPermission);
router.get("/:id", getPermissionById); 
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);
export default router;

import express from "express";
import { getRoles,createRole,hola,getRoleById, updateRole,deleteRole } from "../controller/role.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.get("/:id", getRoleById); 
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
router.get("/hola", hola);
export default router;

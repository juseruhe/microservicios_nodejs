import express from "express";
import { getRoles,createRole,hola,getRoleById, updateRole } from "../controller/role.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.get("/:id", getRoleById); 
router.put("/:id", updateRole);
router.get("/hola", hola);
export default router;

import express from "express";
import { getRoles,createRole,hola,getRoleById } from "../controller/role.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.get("/:id", getRoleById); 
router.get("/hola", hola);
export default router;

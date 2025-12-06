import express from "express";
import { getRoles,createRole,hola } from "../controller/role.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);
router.get("/hola", hola);
export default router;

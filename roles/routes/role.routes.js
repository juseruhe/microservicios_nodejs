import express from "express";
import { getRoles,createRole } from "../controller/role.controller.js";

const router = express.Router();

router.get("/", getRoles);
router.post("/", createRole);

export default router;

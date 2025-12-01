import express from "express";
import cors from "cors";
import roleRoutes from "./routes/role.routes.js";

const app = express();

// Política de CORS
app.use(
  cors({
    origin: "*",    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Para parsear JSON
app.use(express.json());

// Rutas del microservicio
app.use("/roles", roleRoutes);

export default app;

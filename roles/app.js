import express from "express";
import cors from "cors";
import roleRoutes from "./routes/role.routes.js";
import { swaggerUiServe, swaggerUiSetup } from "./config/swagger.js";
import { validateApiKey } from "./middlewares/apiKey.middleware.js";

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
app.use("/roles",validateApiKey, roleRoutes);


// Ruta Swagger
app.use("/api-docs", swaggerUiServe, swaggerUiSetup);

export default app;

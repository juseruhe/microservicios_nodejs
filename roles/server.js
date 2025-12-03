import app from "./app.js";
import dotenv from "dotenv";
import { initDB } from "./config/initDB.js";  
dotenv.config();

const PORT = process.env.PORT || 3001;

initDB();

app.listen(PORT, () => {
  console.log(`Servicio Roles corriendo en puerto ${PORT}`);
});

import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

initDB();

app.listen(PORT, () => {
  console.log(`Servicio Roles corriendo en puerto ${PORT}`);
});

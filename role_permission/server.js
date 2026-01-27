
import app from "./app.js";
import { runMigration } from "./migrate.js"; 

const PORT = process.env.PORT;

await runMigration();

app.listen(PORT, () => {
  console.log(`Servicio Roles corriendo en puerto ${PORT}`);
});

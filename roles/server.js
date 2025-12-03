import app from "./app.js";


const PORT = process.env.PORT_ROLE_HOST;

console.log("PORT:", PORT);

app.listen(PORT, () => {
  console.log(`Servicio Roles corriendo en puerto ${PORT}`);
});

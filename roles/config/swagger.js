import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microservicios de Roles",
      version: "1.0.0",
      description: "Documentación de los Microservicios de Roles",
    },

    // 🔐 Aquí agregamos la API KEY
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "api-key",
          description: "API Key requerida para acceder a los endpoints",
        },
      },
    },

    // 🔒 Seguridad global (todos los endpoints la requieren por defecto)
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },

  // Rutas donde Swagger buscará documentación OpenAPI
  apis: ["./routes/*.js", "./controller/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiServe = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);

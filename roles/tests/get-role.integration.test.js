import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// Mock del servicio ANTES de los imports del controlador
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    findRoleById: jest.fn(),
  },
}));

// Importa controlador y servicio una vez **fuera del describe**
const { getRoleById } = await import("../controller/role.controller.js");
const { RoleService } = await import("../service/role.service.js");

// Crea app Express de prueba
const app = express();
app.use(express.json());
app.get("/roles/:id", getRoleById);

describe("GET /roles/:id", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe devolver el rol cuando existe (201)", async () => {
    const mockRole = { id: 1, name: "Admin" };

    RoleService.findRoleById.mockResolvedValue(mockRole);

    const res = await request(app).get("/roles/1");

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(mockRole);
    expect(RoleService.findRoleById).toHaveBeenCalledWith("1");
  });

  test("debe devolver 404 si no existe el rol", async () => {
    RoleService.findRoleById.mockRejectedValue(new Error("Rol no encontrado"));

    const res = await request(app).get("/roles/999");

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: "Rol no encontrado" });
    expect(RoleService.findRoleById).toHaveBeenCalledWith("999");
  });
});

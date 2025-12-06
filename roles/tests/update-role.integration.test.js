import request from "supertest";
import { jest } from "@jest/globals";

// API KEY para testing
process.env.API_KEY = "test-key";

// Mock del servicio con unstable_mockModule
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    update: jest.fn(),
  },
}));

// Importar después de hacer el mock
const app = (await import("../app.js")).default;
const { RoleService } = await import("../service/role.service.js");

describe("PUT /roles/:id", () => {

  test("debe actualizar un rol y responder con 201", async () => {
    const updatedRoleMock = { id: 1, name: "Admin actualizado" };

    RoleService.update.mockResolvedValue(updatedRoleMock);

    const res = await request(app)
      .put("/roles/1")
      .set("api-key", process.env.API_KEY)
      .send({ name: "Admin actualizado" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(updatedRoleMock);
    expect(RoleService.update).toHaveBeenCalledWith("1", "Admin actualizado");
  });

  test("debe retornar 404 si ocurre un error", async () => {
    RoleService.update.mockRejectedValue(new Error("Rol no encontrado"));

    const res = await request(app)
      .put("/roles/999")
      .set("api-key", process.env.API_KEY) // ← necesario!
      .send({ name: "Nada" });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Rol no encontrado" });
  });
});

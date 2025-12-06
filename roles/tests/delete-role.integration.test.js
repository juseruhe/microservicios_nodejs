import request from "supertest";
import { jest } from "@jest/globals";
import dotenv from "dotenv";

dotenv.config();

// Mock del servicio antes de importar la app
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    deleteRole: jest.fn(),
  },
}));

// Importar después del mock
const app = (await import("../app.js")).default;
const { RoleService } = await import("../service/role.service.js");

describe("DELETE /roles/:id", () => {

  test("debe eliminar un rol y responder con 200", async () => {
    const deleteResponse = { message: "Rol eliminado correctamente" };

    RoleService.deleteRole.mockResolvedValue(deleteResponse);

    const res = await request(app)
      .delete("/roles/1")
      .set("api-key", process.env.API_KEY);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(deleteResponse);
    expect(RoleService.deleteRole).toHaveBeenCalledWith("1");
  });

  test("debe retornar 404 si el rol no existe", async () => {
    RoleService.deleteRole.mockRejectedValue(new Error("Rol no encontrado"));

    const res = await request(app)
      .delete("/roles/999")
      .set("api-key", process.env.API_KEY);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Rol no encontrado" });
  });

});

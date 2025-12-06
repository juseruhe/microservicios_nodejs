// tests/updateRole.test.js
import { jest } from "@jest/globals";

// Mock del servicio
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    update: jest.fn(),
  },
}));

// Una vez creado el mock, importamos el controller
const { updateRole } = await import("../controller/role.controller.js");
const { RoleService } = await import("../service/role.service.js");

describe("Pruebas para updateRole", () => {

  let req, res;

  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: { name: "Nuevo Nombre" }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it("Debe actualizar el rol y responder con 201", async () => {
    
    const mockUpdatedRole = { id: 1, name: "Nuevo Nombre" };
    RoleService.update.mockResolvedValue(mockUpdatedRole);

    await updateRole(req, res);

    expect(RoleService.update).toHaveBeenCalledWith("1", "Nuevo Nombre");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedRole);
  });

  it("Debe capturar el error y responder con 404", async () => {

    RoleService.update.mockRejectedValue(new Error("No encontrado"));

    await updateRole(req, res);

    expect(RoleService.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "No encontrado" });
  });

});

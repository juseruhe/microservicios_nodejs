import { jest } from "@jest/globals";

// Mock del servicio antes de importar el controller
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    findRoleById: jest.fn(),
  },
}));

const { getRoleById } = await import("../controller/role.controller.js");
const { RoleService } = await import("../service/role.service.js");

describe("Pruebas para getRoleById", () => {

  let req, res;

  beforeEach(() => {
    req = { params: { id: 1 } };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Debe devolver un rol por ID y status 201", async () => {
    const mockRole = { id: 1, name: "Admin" };
    RoleService.findRoleById.mockResolvedValue(mockRole);

    await getRoleById(req, res);

    expect(RoleService.findRoleById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockRole);
  });

  test("Debe responder 404 si no encuentra el rol", async () => {
    RoleService.findRoleById.mockRejectedValue(new Error("Rol no encontrado"));

    await getRoleById(req, res);

    expect(RoleService.findRoleById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Rol no encontrado" });
  });
});

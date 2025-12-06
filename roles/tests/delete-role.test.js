import { jest } from "@jest/globals";

// Mock del servicio RoleService
await jest.unstable_mockModule("../service/role.service.js", () => ({
  RoleService: {
    deleteRole: jest.fn(),
  },
}));

// Importar después del mock
const { deleteRole } = await import("../controller/role.controller.js");
const { RoleService } = await import("../service/role.service.js");

describe("Controller: deleteRole", () => {

  let req, res;

  beforeEach(() => {
    req = { params: { id: "1" } };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  test("debe responder con 200 y mensaje al eliminar correctamente", async () => {
    RoleService.deleteRole.mockResolvedValue({
      message: "Rol eliminado correctamente",
    });

    await deleteRole(req, res);

    expect(RoleService.deleteRole).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Rol eliminado correctamente",
    });
  });

  test("debe responder con 404 si ocurre un error en el servicio", async () => {
    RoleService.deleteRole.mockRejectedValue(new Error("Rol no encontrado"));

    await deleteRole(req, res);

    expect(RoleService.deleteRole).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Rol no encontrado",
    });
  });

});

import {describe, expect, jest} from "@jest/globals";

jest.unstable_mockModule("../service/role.service.js", () => ({
    RoleService: {
        createRole: jest.fn()
    }
}))

const { createRole} = await import("../controller/role.controller.js");
const {RoleService} = await import("../service/role.service.js");

describe("Pruebas para createRole", () => {
    it("debe crear un nuevo rol y responder con 201 y el rol creado", async () => {

        const req = {
            body: {
                name: "Administrador"
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(), // permite chaining res.status().json()
            json: jest.fn()
        };

        RoleService.createRole.mockResolvedValue({
            id: 1,
            name: "Administrador"
        });

        await createRole(req, res);

        expect(RoleService.createRole).toHaveBeenCalledWith("Administrador");
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 1,
            name: "Administrador"
        });
    })
})
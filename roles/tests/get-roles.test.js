import {expect, jest} from "@jest/globals";

jest.unstable_mockModule("../repository/role.repository.js", () => ({
   RoleRepository: {
         findAll: jest.fn()
   }
}))

const {getRoles} = await import("../controller/role.controller.js");

const {RoleRepository} = await import("../repository/role.repository.js");

describe("Pruebas para getRoles", () => {
    it("debe obtener todos los roles y responder con 200 y la lista de roles", async () => {

        const rolesMock = [
            { id: 1, name: "Administrador" },
            { id: 2, name: "Usuario" }
        ];

        RoleRepository.findAll.mockResolvedValue(rolesMock);

        const req = {};

        const res = {
            json: jest.fn()
        };

        await getRoles(req, res);

        expect(RoleRepository.findAll).toHaveBeenCalled();

        expect(res.json).toHaveBeenCalledWith(rolesMock);

    })
})
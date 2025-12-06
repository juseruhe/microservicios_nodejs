import { hola } from "../controller/role.controller.js";
import { jest } from "@jest/globals";

describe("Prueba del controlador hola", () => {
  it("debe responder con 201 y el mensaje correcto", async () => {

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(), // permite chaining res.status().json()
      json: jest.fn()
    };

    await hola(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Hola desde el servicio de roles");
  });
});

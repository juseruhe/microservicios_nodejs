import request from 'supertest';
import { jest } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config();

let app;
let RoleService;

beforeAll(async () => {
  // Mock del servicio
  await jest.unstable_mockModule('../service/role.service.js', () => ({
    RoleService: {
      getAllRoles: jest.fn(),
    }
  }));

  // Importar servicio mockeado
  ({ RoleService } = await import('../service/role.service.js'));

  // Importar app DESPUÉS del mock
  app = (await import('../app.js')).default;
});

describe('GET /roles - integración', () => {
  it('debe obtener todos los roles y devolver 200', async () => {
    const fakeRoles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' }
    ];

    RoleService.getAllRoles.mockResolvedValue(fakeRoles);

    const res = await request(app)
      .get('/roles')
      .set('api-key', process.env.API_KEY); // Obligatorio por el middleware

    expect(res.status).toBe(200);
    expect(res.body).toEqual(fakeRoles);
    expect(RoleService.getAllRoles).toHaveBeenCalledTimes(1);
  });
});

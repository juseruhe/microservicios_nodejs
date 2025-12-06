import request from 'supertest';
import { jest } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config();

let app;
let RoleService;

beforeAll(async () => {
  await jest.unstable_mockModule('../service/role.service.js', () => ({
    RoleService: {
      createRole: jest.fn(),
    }
  }));

  // Importar mock
  ({ RoleService } = await import('../service/role.service.js'));

  // Importar app DESPUÉS del mock
  app = (await import('../app.js')).default;
});

describe('POST /roles - integración', () => {
  it('debe crear un rol', async () => {
    const fakeRole = { id: 1, name: 'Admin' };

    RoleService.createRole.mockResolvedValue(fakeRole);

    const res = await request(app)
      .post('/roles')
      .set('api-key', process.env.API_KEY)
      .send({ name: 'Admin' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(fakeRole);
    expect(RoleService.createRole).toHaveBeenCalledWith('Admin');
  });
});

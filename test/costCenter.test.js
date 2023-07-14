const request = require('supertest');
const app = require('../app');

describe('GET /api/ver1/', () => {
  it('Debería mostrar todos los centros de costo', async () => {
    const response = await request(app).post("/costcenter/findCostCenter").send();
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(["msg", "Error en la busqueda"]);
  });
});
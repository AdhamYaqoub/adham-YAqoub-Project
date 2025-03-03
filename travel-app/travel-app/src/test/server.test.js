const request = require('supertest');
const server = require('../server/server'); 

afterAll(() => {
  server.close(); // أغلق الخادم بعد انتهاء الاختبارات
});

describe('Express Server API Tests', () => {
  test('GET /api/geonames should return mock location data', async () => {
    const response = await request(server).get('/api/geonames?location=New York');
    expect(response.statusCode).toBe(200);
  });
});

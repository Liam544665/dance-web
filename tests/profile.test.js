const request = require('supertest');
const app = require('../server');

describe('Profile Route', () => {
  it('GET /profile should redirect if not logged in', async () => {
    const res = await request(app).get('/profile');
    expect(res.statusCode).toBe(302);
  });
});

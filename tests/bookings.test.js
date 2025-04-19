const request = require('supertest');
const app = require('../server');

describe('Bookings Routes', () => {
  it('GET /booking/new/:courseId should redirect if not logged in', async () => {
    const fakeCourseId = 'abc123';
    const res = await request(app).get(`/booking/new/${fakeCourseId}`);
    expect(res.statusCode).toBe(302);
  });
});

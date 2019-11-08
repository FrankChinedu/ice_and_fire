const supertest = require('supertest');
const { app } = require('../app');

const server = () => supertest(app);

describe('EXTERNAL BOOKS', ()=>{
  it('should get external books api', async ()=>{
    const { status, body } = await server().get(
      '/api/external-books');
      expect(status).toBe(200);
      expect(Object.keys(body)).toMatchSnapshot();
  });
});

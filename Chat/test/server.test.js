const server = require('../app');
const request = require('supertest');

afterEach(async () => {
    await server.close();
});

afterAll(async () => {
    await server.close();
});

describe('Is server online', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
        done();
    });
});

describe('Get random 404', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server).get('/random');
        expect(response.status).toEqual(404);
        done();
    });
});
const server = require('../app');
const request = require('supertest');

afterEach(async () => {
    await server.close();
});

afterAll(async () => {
    await server.close();
});

describe('Is server online', () => {
    test('should respond as expected', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });
});

describe('Get random 404', () => {
    test('should respond as expected', async () => {
        const response = await request(server).get('/imagedoesnotexist');
        expect(response.status).toEqual(404);
    });
});

describe('Get image', () => {
    test('should respond as expected', async () => {
        const response = await request(server).get('/chat.jpg');
        expect(response.status).toEqual(200);
    });
})
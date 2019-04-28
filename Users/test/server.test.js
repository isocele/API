const server = require('../app');
const request = require('supertest');
const mongoose = require('mongoose');

afterEach(async () => {
    await server.close();
});

afterAll(async () => {
    await mongoose.disconnect();
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
        const response = await request(server).get('/random');
        expect(response.status).toEqual(404);
    });
});
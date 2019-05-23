'use strict';
const server = require('../app');
const request = require('supertest');
let token = '';
let id = '';

afterEach(async () => {
    await server.close();
});

afterAll(async () => {
    await server.close();
});

describe('Signup without query', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/register');
        expect(response.status).toEqual(400);
        done();
    });
});

describe('Succesfull signup', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/register')
        .send({
            name: 'Jest',
            last_name: 'Test',
            email: 'jest@gmail.com',
            password: 'jesttest'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Account already exists', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/register')
        .send({
            name: 'Jest',
            last_name: 'Test',
            email: 'jest@gmail.com',
            password: 'jesttest'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(400);
        expect(response.text).toEqual('Error: Email already used');
        done();
    })
});

describe('Succesfull login', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/login')
        .send({
            email: 'jest@gmail.com',
            password: 'jesttest'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        token = response.body.token;
        done();
    })
});

describe('Get Reset password', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .get('/reset')
        .send({
            email: 'jest@gmail.com',
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Get profile not authenticated', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .get('/profile')
        .send({
            email: 'jest@gmail.com',
            password: 'jesttest'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(403);
        done();
    })
});

describe('Succesfull get profile', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .get('/profile')
        .query({
            token: token
        })
        .send({
            email: 'jest@gmail.com',
            password: 'jesttest'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        id = response.body.id;
        done();
    })
});
 
describe('Succesfull put profile', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .put('/profile')
        .query({
            token: token
        })
        .send({
            name: 'Toto',
            last_name: 'Test',
            email: 'toto@gmail.com',
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Succesfull put profile x2', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .put('/profile')
        .query({
            token: token
        })
        .send({
            name: 'Jest',
            last_name: 'Test',
            email: 'jest@gmail.com',
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Post Reset password', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/reset')
        .query({
            id: id
        })
        .send({
            email: 'jest@gmail.com',
            password: 'jestnewpassword'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Login after password reset', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/login')
        .send({
            email: 'jest@gmail.com',
            password: 'jestnewpassword'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        token = response.body.token;
        done();
    })
});

describe('Succesfull delete', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/delete')
        .query({
            token: token
        })
        .send({
            email: 'jest@gmail.com'
        })
        .set('Content-Type', 'application/json');
        expect(response.status).toEqual(200);
        done();
    })
});

describe('Login without query', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/login');
        expect(response.status).toEqual(400);
        done();
    });
});
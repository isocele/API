const server = require('../app');
const request = require('supertest');

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
        done();
    })
});

describe('Succesfull delete', () => {
    test('should respond as expected', async (done) => {
        const response = await request(server)
        .post('/delete')
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
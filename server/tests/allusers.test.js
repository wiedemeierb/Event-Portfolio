let app = require('../server.js');
let testServer = require('supertest');

describe('test the all users router', () => {
    test('should respond 418 to /api/allusers', async() => {
        let response = await testServer(app).get('/api/allusers')
            expect(response.statusCode).toBe(200)
    });
})
let app = require('../server.js');
let testServer = require('supertest');

describe('test the all users router', () => {
    test('should respond 200 to /api/allusers', async() => {
        //await is the promise part - the steps that need to take place
        let response = await testServer(app).get('/api/allusers')
            expect(response.statusCode).toBe(200)
    });
})
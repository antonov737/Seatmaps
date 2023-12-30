const request = require("supertest");
const app = require('./app');

describe('Test Flight API Service', () => {
    test('GET /flights succeeds', () => {
        return request(app)
            .get('/flights')
            .expect(200);
    });
    test('GET /flights returns JSON', () => {
        return request(app)
            .get('/flights')
            .expect('Content-type', /json/);
    });
    test('GET /flights/BA235 succeeds', () => {
        return request(app)
            .get('/flights/BA235')
            .expect(200);
    });
    test('GET /flights/BA235 includes SVO', () => {
        return request(app)
            .get('/flights/BA235')
            .expect(/SVO/);
    });
    test('GET /name/A321 includes Airbus A321', () => {
        return request(app)
            .get('/name/A321')
            .expect('Airbus A321');
    })
    test('GET /name/B78X succeeds', () => {
        return request(app)
            .get('/name/B78X')
            .expect(200);
    })
    test('GET /flight/PA235 fails', () => {
        return request(app)
            .get('/flights/PA235')
            .expect(404);
    })
});